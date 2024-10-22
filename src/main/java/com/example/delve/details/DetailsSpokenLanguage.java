package com.example.delve.details;

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
"iso_639_1",
"name"
})
public class DetailsSpokenLanguage {

@JsonProperty("iso_639_1")
private String iso6391;
@JsonProperty("name")
private String name;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("iso_639_1")
public String getIso6391() {
return iso6391;
}

@JsonProperty("iso_639_1")
public void setIso6391(String iso6391) {
this.iso6391 = iso6391;
}

@JsonProperty("name")
public String getName() {
return name;
}

@JsonProperty("name")
public void setName(String name) {
this.name = name;
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
return new ToStringBuilder(this).append("iso6391", iso6391).append("name", name).append("additionalProperties", additionalProperties).toString();
}

}