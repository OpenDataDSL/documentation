package com.opendatadsl.search;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public class Page {
    private String objectID;
    private String name;
    private String description;
    private List<String> tags = new ArrayList<>();
    private String slug;
    private String url;
    private String type = "lvl1";
    private String language = "en";
    private String docusaurus_tag;
    private Hierarchy hierarchy = new Hierarchy();

    public String getObjectID() {
        return objectID;
    }

    public Page setObjectID(String objectID) {
        this.objectID = objectID;
        return this;
    }

    public String getName() {
        return name;
    }

    public Page setName(String name) {
        this.name = name;
        return this;
    }

    public String getType() {
        return type;
    }

    public Page setType(String type) {
        this.type = type;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Page setDescription(String description) {
        this.description = description;
        return this;
    }

    public List<String> getTags() {
        return tags;
    }

    public Page setTags(List<String> tags) {
        this.tags = tags;
        return this;
    }

    public String getUrl() {
        return url;
    }

    public Page setUrl(String url) {
        this.url = url;
        return this;
    }

    public String getSlug() {
        return slug;
    }

    public Page setSlug(String slug) {
        this.slug = slug;
        return this;
    }

    public Hierarchy getHierarchy() {
        return hierarchy;
    }

    public Page setHierarchy(Hierarchy hierarchy) {
        this.hierarchy = hierarchy;
        return this;
    }

    public String getLanguage() {
        return language;
    }

    public Page setLanguage(String language) {
        this.language = language;
        return this;
    }

    public String getDocusaurus_tag() {
        return docusaurus_tag;
    }

    public Page setDocusaurus_tag(String docusaurus_tag) {
        this.docusaurus_tag = docusaurus_tag;
        return this;
    }
}
