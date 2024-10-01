package com.opendatadsl.search;

import com.azure.search.documents.indexes.SearchableField;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class DocSection {
    @JsonProperty("section")
    @SearchableField(isFilterable = true, isFacetable = true)
    public String section;

	@JsonProperty("text")
    @SearchableField(isFilterable = true, isFacetable = true)
    public String text = "";

}
