package com.example.delve.classmodels;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang3.builder.ToStringBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
"id",
"logo_path",
"name",
"origin_country"
})
public class ProductionCompany {

@JsonProperty("id")
private Integer id;
@JsonProperty("logo_path")
private String logoPath;
@JsonProperty("name")
private String name;
@JsonProperty("origin_country")
private String originCountry;

@JsonProperty("id")
public Integer getId() {
return id;
}

@JsonProperty("id")
public void setId(Integer id) {
this.id = id;
}

@JsonProperty("logo_path")
public String getLogoPath() {
return logoPath;
}

@JsonProperty("logo_path")
public void setLogoPath(String logoPath) {
this.logoPath = logoPath;
}

@JsonProperty("name")
public String getName() {
return name;
}

@JsonProperty("name")
public void setName(String name) {
this.name = name;
}

@JsonProperty("origin_country")
public String getOriginCountry() {
return originCountry;
}

@JsonProperty("origin_country")
public void setOriginCountry(String originCountry) {
this.originCountry = originCountry;
}

@Override
public String toString() {
return new ToStringBuilder(this).append("id", id).append("logoPath", logoPath).append("name", name).append("originCountry", originCountry).toString();
}

}