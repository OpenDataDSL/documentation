package com.opendatadsl.search;

import java.util.Arrays;
import java.util.ArrayList;
import java.io.File;
import java.io.FilenameFilter;

import com.azure.core.credential.AzureKeyCredential;
import com.azure.search.documents.SearchClient;
import com.azure.search.documents.SearchClientBuilder;
import com.azure.search.documents.indexes.SearchIndexClient;
import com.azure.search.documents.indexes.SearchIndexClientBuilder;
import com.azure.search.documents.indexes.models.IndexDocumentsBatch;
import com.azure.search.documents.indexes.models.SearchIndex;
import com.azure.search.documents.indexes.models.SearchSuggester;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main(String[] args) {
        var searchServiceEndpoint = "https://odsl.search.windows.net";
        String api_key = System.getenv("API_KEY");
        if (api_key == null)
            throw new RuntimeException("You need to specify the API_KEY");
        var adminKey = new AzureKeyCredential(api_key);
        String indexName = "documentation";
    
        SearchIndexClient searchIndexClient = new SearchIndexClientBuilder()
            .endpoint(searchServiceEndpoint)
            .credential(adminKey)
            .buildClient();
    
        SearchClient searchClient = new SearchClientBuilder()
            .endpoint(searchServiceEndpoint)
            .credential(adminKey)
            .indexName(indexName)
            .buildClient();

        searchIndexClient.createOrUpdateIndex(
            new SearchIndex(indexName, SearchIndexClient.buildSearchFields(Doc.class, null))
            .setSuggesters(new SearchSuggester("sg", Arrays.asList("title"))));

        // Upload documents to the Search Index
        uploadDocuments(searchClient);
    }

    private static void uploadDocuments(SearchClient searchClient)
    {
        File root = new File(".");
        uploadDocuments(searchClient, root);
    }

    private static void uploadDocuments(SearchClient searchClient, File directory) {
        System.out.println("Checking path: " + directory.getAbsolutePath());
        var doclist = new ArrayList<Doc>();

        // Add our documents
        FilenameFilter docs = new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return name.toLowerCase().endsWith(".md");
            }
        };
        FilenameFilter dirs = new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return new File(dir, name).isDirectory();
            }
        };

        File[] files = directory.listFiles(docs);
        if (files != null) {
            for (File f : files) {
                Doc doc = new Doc();
                doc.parse(f);
                System.out.println(doc.show());
                doclist.add(doc);
            }
        }

        if (doclist.size() > 0) {
            var batch = new IndexDocumentsBatch<Doc>();
            batch.addMergeOrUploadActions(doclist);
            try
            {
                searchClient.indexDocuments(batch);
            }
            catch (Exception e)
            {
                e.printStackTrace();
                // If for some reason any documents are dropped during indexing, you can compensate by delaying and
                // retrying. This simple demo just logs failure and continues
                System.err.println("Failed to index some of the documents");
            }
        }

        // Read subdirectories
        File[] subs = directory.listFiles(dirs);
        if (subs != null) {
            for (File f : subs) {
                uploadDocuments(searchClient, f);
            }
        }

    }
}
