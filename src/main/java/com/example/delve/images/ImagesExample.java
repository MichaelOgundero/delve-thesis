package com.example.delve.images;

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
"id",
"backdrops",
"posters"
})
public class ImagesExample {

@JsonProperty("id")
private Integer id;
@JsonProperty("backdrops")
private List<ImagesBackdrop> backdrops = null;
@JsonProperty("posters")
private List<ImagesPoster> posters = null;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("id")
public Integer getId() {
return id;
}

@JsonProperty("id")
public void setId(Integer id) {
this.id = id;
}

@JsonProperty("backdrops")
public List<ImagesBackdrop> getBackdrops() {
return backdrops;
}

@JsonProperty("backdrops")
public void setBackdrops(List<ImagesBackdrop> backdrops) {
this.backdrops = backdrops;
}

@JsonProperty("posters")
public List<ImagesPoster> getPosters() {
return posters;
}

@JsonProperty("posters")
public void setPosters(List<ImagesPoster> posters) {
this.posters = posters;
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
return new ToStringBuilder(this).append("id", id).append("backdrops", backdrops).append("posters", posters).append("additionalProperties", additionalProperties).toString();
}

}