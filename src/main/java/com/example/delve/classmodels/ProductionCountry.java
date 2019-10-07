package com.example.delve.classmodels;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang3.builder.ToStringBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
"iso_3166_1",
"name"
})
public class ProductionCountry {

@JsonProperty("iso_3166_1")
private String iso31661;
@JsonProperty("name")
private String name;

@JsonProperty("iso_3166_1")
public String getIso31661() {
return iso31661;
}

@JsonProperty("iso_3166_1")
public void setIso31661(String iso31661) {
this.iso31661 = iso31661;
}

@JsonProperty("name")
public String getName() {
return name;
}

@JsonProperty("name")
public void setName(String name) {
this.name = name;
}

@Override
public String toString() {
return new ToStringBuilder(this).append("iso31661", iso31661).append("name", name).toString();
}

}