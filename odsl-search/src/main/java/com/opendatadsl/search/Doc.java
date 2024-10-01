package com.opendatadsl.search;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.azure.search.documents.indexes.SearchableField;
import com.azure.search.documents.indexes.SimpleField;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class Doc {
	@JsonProperty("id")
	@SimpleField(isKey = true)
	public String id;

	@JsonProperty("slug")
	@SimpleField()
	public String slug;

	@JsonProperty("title")
	@SearchableField(isSortable = true)
	public String title;

	@JsonProperty("description")
	@SearchableField(analyzerName = "en.microsoft")
	public String description;

	@JsonProperty("tags")
	@SearchableField(isFilterable = true, isFacetable = true)
	public String[] tags;
	
	@JsonProperty("sections")
    public DocSection[] sections;

	public void parse(File f) {
		try {
			slug = f.getPath().substring(2).replace('\\', '/');
			slug = slug.substring(0, slug.length() - 3);
			List<String> lines = Files.lines(f.toPath()).collect(Collectors.toList());
			List<DocSection> s = new ArrayList<>();
			DocSection section = new DocSection();
			section.section = "Main";
			s.add(section);
			for (int i=0; i<lines.size(); i++) {
				String line = lines.get(i);
				if (line.startsWith("slug:")) {
					slug = "docs" + line.substring(5).trim();
				} else if (line.startsWith("title:")) {
					title = line.substring(6).trim();
				} else if (line.startsWith("description:")) {
					description = line.substring(12).trim();
				} else if (line.startsWith("tags:")) {
					line = lines.get(++i);
					List<String> t = new ArrayList<>();
					while (line.contains("- ")) {
						t.add(line.substring(line.indexOf("- ") + 2).trim());
						line = lines.get(++i);
					}
					tags = t.toArray(new String[0]);
					i--;
				} else if (line.startsWith("## ")) {
					section = new DocSection();
					section.section = line.substring(3);
					s.add(section);
				} else if (line.startsWith("====")) {
					if (title == null && i > 0) {
						title = lines.get(i-1);
						section.text = "";
					}
					if (description == null) {
						for (int j = (i+1); j<lines.size(); j++) {
							line = lines.get(j).replace("\r\n", "");
							if (!line.isEmpty()) {
								description = line;
								break;
							}
						}
					}
				} else {
					section.text = section.text + System.lineSeparator() + line;
				}
			}
			sections = s.toArray(new DocSection[0]);
			id = slug.replace('/', '_');
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String show() {
		return slug + " " + title + " (" + description + ") " + Arrays.toString(tags);
	}

	@Override
	public String toString() {
		try {
			return new ObjectMapper().configure(SerializationFeature.INDENT_OUTPUT, true).writeValueAsString(this);
		} catch (JsonProcessingException e) {
			return slug;
		}
	}
}
