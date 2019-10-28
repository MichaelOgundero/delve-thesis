package com.example.delve.ratings;

import java.util.HashMap;
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
"certification",
"iso_639_1",
"note",
"release_date",
"type"
})
public class ReleaseDate {

@JsonProperty("certification")
private String certification;
@JsonProperty("iso_639_1")
private String iso6391;
@JsonProperty("note")
private String note;
@JsonProperty("release_date")
private String releaseDate;
@JsonProperty("type")
private Integer type;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("certification")
public String getCertification() {
return certification;
}

@JsonProperty("certification")
public void setCertification(String certification) {
this.certification = certification;
}

@JsonProperty("iso_639_1")
public String getIso6391() {
return iso6391;
}

@JsonProperty("iso_639_1")
public void setIso6391(String iso6391) {
this.iso6391 = iso6391;
}

@JsonProperty("note")
public String getNote() {
return note;
}

@JsonProperty("note")
public void setNote(String note) {
this.note = note;
}

@JsonProperty("release_date")
public String getReleaseDate() {
return releaseDate;
}

@JsonProperty("release_date")
public void setReleaseDate(String releaseDate) {
this.releaseDate = releaseDate;
}

@JsonProperty("type")
public Integer getType() {
return type;
}

@JsonProperty("type")
public void setType(Integer type) {
this.type = type;
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
return new ToStringBuilder(this).append("certification", certification).append("iso6391", iso6391).append("note", note).append("releaseDate", releaseDate).append("type", type).append("additionalProperties", additionalProperties).toString();
}

}