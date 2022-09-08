import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MapSkeleton from "./Skeletons/MapSkeletion";

const DeliveryMap = ({ setLocation }) => {
  const [position, setPosition] = useState();

  // position && console.log("position: ", position.latitude, position.longitude);

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        setPosition(coords);
        setLocation(coords);
      });
    }
  }, []);

  const defaultZoom = 19;

  const mapStyle = {
    height: "250px",
    width: "100%",
    position: "relative",
  };
  const containerStyle = {
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    position: "relative",
  };

  const moveMarker = (props, marker, e) => {
    setPosition({
      ...position,
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
    });
    // console.log(e.latLng.lat(), e.latLng.lng());
  };

  return position && Map ? (
    <Map
      google={window.google}
      streetViewControl={false}
      mapTypeControl={false}
      fullscreenControl={false}
      zoom={defaultZoom}
      initialCenter={{ lat: position.latitude, lng: position.longitude }}
      center={{
        lat: position.latitude,
        lng: position.longitude,
      }}
      style={mapStyle}
      containerStyle={containerStyle}
    >
      <Marker
        position={{ lat: position.latitude, lng: position.longitude }}
        draggable={true}
        onDragend={moveMarker}
        name={"NAME"}
        title="Location"
        id={1}
      ></Marker>
      {/* 
      <InfoWindow marker={"NAME"} visible={true}>
        <div>
          <h1>"HERE"</h1>
        </div>
      </InfoWindow> */}
    </Map>
  ) : (
    <MapSkeleton />
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(DeliveryMap);