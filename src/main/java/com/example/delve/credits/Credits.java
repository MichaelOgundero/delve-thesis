package com.example.delve.credits;

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
"cast",
"crew"
})
public class Credits {

@JsonProperty("id")
private Integer id;
@JsonProperty("cast")
private List<Cast> cast = null;
@JsonProperty("crew")
private List<Crew> crew = null;
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

@JsonProperty("cast")
public List<Cast> getCast() {
return cast;
}

@JsonProperty("cast")
public void setCast(List<Cast> cast) {
this.cast = cast;
}

@JsonProperty("crew")
public List<Crew> getCrew() {
return crew;
}

@JsonProperty("crew")
public void setCrew(List<Crew> crew) {
this.crew = crew;
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
return new ToStringBuilder(this).append("id", id).append("cast", cast).append("crew", crew).append("additionalProperties", additionalProperties).toString();
}

}
