/*global google*/
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState } from "react";

const TrackingMap = ({ destinationLatitude, destinationLongitude }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const calculateRoute = async () => {
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: { lat: 45.45906956576, lng: -73.6390507221222 },
      destination: { lat: destinationLatitude, lng: destinationLongitude },
      travelMode: google.maps.TravelMode.WALKING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  return (
    isLoaded && (
      <GoogleMap
        zoom={17}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          draggable: false,
        }}
        onLoad={calculateRoute}
      >
        <Marker />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    )
  );
};

export default TrackingMap;

// import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import MapSkeleton from "./Skeletons/MapSkeletion";

// const TrackingMap = ({ latitude, longitude }) => {
//   const [position, setPosition] = useState({
//     latitude: latitude,
//     longitude: longitude,
//   });

//   const defaultZoom = 17;

//   const mapStyle = {
//     height: "100px",
//     width: "100%",
//     position: "relative",
//   };
//   const containerStyle = {
//     width: "100%",
//     height: "100%",
//     margin: "0",
//     padding: "0",
//     position: "relative",
//   };

//   return position && Map ? (
//     <Map
//       google={window.google}
//       streetViewControl={false}
//       mapTypeControl={false}
//       fullscreenControl={false}
//       zoom={defaultZoom}
//       initialCenter={{ lat: position.latitude, lng: position.longitude }}
//       center={{
//         lat: position.latitude,
//         lng: position.longitude,
//       }}
//       style={mapStyle}
//       containerStyle={containerStyle}
//     >
//       <Marker
//         position={{ lat: position.latitude, lng: position.longitude }}
//         // draggable={true}
//         // onDragend={moveMarker}
//         name={"NAME"}
//         title="Location"
//         id={1}
//       ></Marker>
//       {/*
//       <InfoWindow marker={"NAME"} visible={true}>
//         <div>
//           <h1>"HERE"</h1>
//         </div>
//       </InfoWindow> */}
//     </Map>
//   ) : (
//     <MapSkeleton />
//   );
// };

// export default GoogleApiWrapper({
//   apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
// })(TrackingMap);
