package com.example.delve.credits;

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
"cast_id",
"character",
"credit_id",
"gender",
"id",
"name",
"order",
"profile_path"
})
public class Cast {

@JsonProperty("cast_id")
private Integer castId;
@JsonProperty("character")
private String character;
@JsonProperty("credit_id")
private String creditId;
@JsonProperty("gender")
private Integer gender;
@JsonProperty("id")
private Integer id;
@JsonProperty("name")
private String name;
@JsonProperty("order")
private Integer order;
@JsonProperty("profile_path")
private Object profilePath;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("cast_id")
public Integer getCastId() {
return castId;
}

@JsonProperty("cast_id")
public void setCastId(Integer castId) {
this.castId = castId;
}

@JsonProperty("character")
public String getCharacter() {
return character;
}

@JsonProperty("character")
public void setCharacter(String character) {
this.character = character;
}

@JsonProperty("credit_id")
public String getCreditId() {
return creditId;
}

@JsonProperty("credit_id")
public void setCreditId(String creditId) {
this.creditId = creditId;
}

@JsonProperty("gender")
public Integer getGender() {
return gender;
}

@JsonProperty("gender")
public void setGender(Integer gender) {
this.gender = gender;
}

@JsonProperty("id")
public Integer getId() {
return id;
}

@JsonProperty("id")
public void setId(Integer id) {
this.id = id;
}

@JsonProperty("name")
public String getName() {
return name;
}

@JsonProperty("name")
public void setName(String name) {
this.name = name;
}

@JsonProperty("order")
public Integer getOrder() {
return order;
}

@JsonProperty("order")
public void setOrder(Integer order) {
this.order = order;
}

@JsonProperty("profile_path")
public Object getProfilePath() {
return profilePath;
}

@JsonProperty("profile_path")
public void setProfilePath(Object profilePath) {
this.profilePath = profilePath;
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
return new ToStringBuilder(this).append("castId", castId).append("character", character).append("creditId", creditId).append("gender", gender).append("id", id).append("name", name).append("order", order).append("profilePath", profilePath).append("additionalProperties", additionalProperties).toString();
}

}