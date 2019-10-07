package com.example.delve.upcoming;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang3.builder.ToStringBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
"results",
"page",
"total_results",
"dates",
"total_pages"
})
public class UpcomingExample {

@JsonProperty("results")
private List<Result> results = null;
@JsonProperty("page")
private Integer page;
@JsonProperty("total_results")
private Integer totalResults;
@JsonProperty("dates")
private Dates dates;
@JsonProperty("total_pages")
private Integer totalPages;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("results")
public List<Result> getResults() {
return results;
}

@JsonProperty("results")
public void setResults(List<Result> results) {
this.results = results;
}

@JsonProperty("page")
public Integer getPage() {
return page;
}

@JsonProperty("page")
public void setPage(Integer page) {
this.page = page;
}

@JsonProperty("total_results")
public Integer getTotalResults() {
return totalResults;
}

@JsonProperty("total_results")
public void setTotalResults(Integer totalResults) {
this.totalResults = totalResults;
}

@JsonProperty("dates")
public Dates getDates() {
return dates;
}

@JsonProperty("dates")
public void setDates(Dates dates) {
this.dates = dates;
}

@JsonProperty("total_pages")
public Integer getTotalPages() {
return totalPages;
}

@JsonProperty("total_pages")
public void setTotalPages(Integer totalPages) {
this.totalPages = totalPages;
}

@JsonAnyGetter
public Map<String, Object> getAdditionalProperties() {
return this.additionalProperties;
}

@JsonAnySetter
public void setAdditionalProperty(String name, Object value) {
this.additionalProperties.put(name, value);
}

@Override
public String toString() {
return new ToStringBuilder(this).append("results", results).append("page", page).append("totalResults", totalResults).append("dates", dates).append("totalPages", totalPages).append("additionalProperties", additionalProperties).toString();
}

}
