package com.example.delve.nowplayingcarousel;

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
"maximum",
"minimum"
})
public class NowPlayingCarouselDates {

@JsonProperty("maximum")
private String maximum;
@JsonProperty("minimum")
private String minimum;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("maximum")
public String getMaximum() {
return maximum;
}

@JsonProperty("maximum")
public void setMaximum(String maximum) {
this.maximum = maximum;
}

@JsonProperty("minimum")
public String getMinimum() {
return minimum;
}

@JsonProperty("minimum")
public void setMinimum(String minimum) {
this.minimum = minimum;
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
return new ToStringBuilder(this).append("maximum", maximum).append("minimum", minimum).append("additionalProperties", additionalProperties).toString();
}

}