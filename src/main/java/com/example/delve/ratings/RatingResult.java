package com.example.delve.ratings;

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
"iso_3166_1",
"release_dates"
})
public class RatingResult {

@JsonProperty("iso_3166_1")
private String iso31661;
@JsonProperty("release_dates")
private List<ReleaseDate> releaseDates = null;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("iso_3166_1")
public String getIso31661() {
return iso31661;
}

@JsonProperty("iso_3166_1")
public void setIso31661(String iso31661) {
this.iso31661 = iso31661;
}

@JsonProperty("release_dates")
public List<ReleaseDate> getReleaseDates() {
return releaseDates;
}

@JsonProperty("release_dates")
public void setReleaseDates(List<ReleaseDate> releaseDates) {
this.releaseDates = releaseDates;
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
return new ToStringBuilder(this).append("iso31661", iso31661).append("releaseDates", releaseDates).append("additionalProperties", additionalProperties).toString();
}

}