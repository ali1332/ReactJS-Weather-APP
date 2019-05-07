import React from 'react';
import WeatherIcon from 'react-icons-weather';
 
const WeatherIconsComponent = (props) => {
  return (
    <div>
      <WeatherIcon name={props.name} iconId={props.iconId} flip="horizontal" rotate="90" />
    </div>
  )
}
export default WeatherIconsComponent;