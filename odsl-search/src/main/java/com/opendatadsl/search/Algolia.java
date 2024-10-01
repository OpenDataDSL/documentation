package com.opendatadsl.search;

import com.algolia.search.DefaultSearchClient;
import com.algolia.search.SearchClient;
import com.algolia.search.SearchIndex;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.FilenameFilter;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

public class Algolia {
    public static void main(String[] args) {
        String api_key = System.getenv("API_KEY");
        if (api_key == null)
            throw new RuntimeException("You need to specify the API_KEY");
        SearchClient client = DefaultSearchClient.create("GNGE5W5WZ3", api_key);
        SearchIndex<Page> index = client.initIndex("dev_website", Page.class);
        File root = new File("docs");
        System.out.println("Building index from directory: " + root.getAbsolutePath());
        List<Page> pages = new ArrayList<>();
        buildIndex(root, pages, null);
        index.saveObjects(pages);
        System.out.println("Built index with: " + pages.size() + " pages");
    }

    private static void buildIndex(File root, List<Page> pages, String parent) {
        System.out.println("Checking: " + root.getAbsolutePath());
        FilenameFilter docs = new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return name.toLowerCase().endsWith(".html");
            }
        };
        FilenameFilter dirs = new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return new File(dir, name).isDirectory();
            }
        };

        File[] files = root.listFiles(docs);
        if (files != null) {
            for (File f : files) {
                try {
                    parent = parse(f, pages, parent);
                } catch (Exception e) {
                    System.err.println(f.getAbsolutePath() + ": " + e.getMessage());
                }
            }
        }

        // Read subdirectories
        File[] subs = root.listFiles(dirs);
        if (subs != null) {
            for (File f : subs) {
                buildIndex(f, pages, parent);
            }
        }
    }

    private static String parse(File f, List<Page> pages, String parent) throws Exception {
        String slug = f.getPath();
        slug = slug.substring(0, slug.length() - f.getName().length() - 1).replace("\\", "/");
        String url = "https://doc.opendatadsl.com/" + slug;
        Page page = new Page().setUrl(url).setSlug(slug);
        page.getHierarchy().setLvl0(parent);
        Document doc = Jsoup.parse(f, Charset.defaultCharset().name());
        Elements e = doc.select("div.markdown");
        if (e.size() == 0)
            return null;
        for (Element element : e) {
            Elements h1 = e.select("h1");
            if (h1.size() > 0) {
                page.setName(h1.get(0).text());
                page.getHierarchy().setLvl1(h1.get(0).text());
            } else {
                return null;
            }
            Elements p = e.select("p");
            if (p.size() > 0) {
                page.setDescription(p.get(0).text());
                page.getHierarchy().setLvl2(p.get(0).text());
            }
            Elements tags = doc.select("a.tag_WK-t");
            for (Element t : tags) {
                page.getTags().add(t.text());
            }
        }
        page.setDocusaurus_tag("default");
        page.setObjectID(slug.replace('/', '_'));
        pages.add(page);
        return page.getName();
    }
}
