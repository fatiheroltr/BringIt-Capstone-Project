/*global google*/
import { useAuth0 } from "@auth0/auth0-react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const TrackingMap = ({ setLocation }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [position, setPosition] = useState();
  const { user } = useAuth0();

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        setPosition(coords);
        setLocation(coords);
      });
    }
  }, []);

  const currentLocation = position && {
    lat: position.latitude,
    lng: position.longitude,
  };
  // console.log("currentLocation: ", currentLocation);

  const onLoad = (infoWindow) => {
    // console.log("infoWindow: ", infoWindow);
  };

  const mapContainerStyle = {
    width: "100%",
    height: "250px",
    margin: "0",
    padding: "0",
    position: "relative",
  };

  const moveMarker = (e) => {
    setPosition({
      ...position,
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
    });
    setLocation({
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
    });
  };

  const mapOptions = {
    fullscreenControl: false,
    zoom: 19,
    fullscreenControl: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
  };

  // const iconMarker = {
  //   url: user.picture,
  //   scaledSize: { width: 60, height: 60 },
  // };

  return (
    isLoaded && (
      <GoogleMap
        id="marker-example"
        mapContainerStyle={mapContainerStyle}
        options={mapOptions}
        center={currentLocation}
      >
        <Marker
          onLoad={onLoad}
          position={currentLocation}
          onDragEnd={(e) => moveMarker(e)}
          draggable={true}
          // icon={iconMarker}
        >
          {currentLocation && (
            <InfoWindow onLoad={onLoad} position={currentLocation}>
              <div
                style={{
                  color: "var(--primary-color)",
                  textAlign: "center",
                }}
              >
                {/* <h1>You are here</h1> */}
                <img
                  src={user.picture}
                  style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                ></img>
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    )
  );
};

export default TrackingMap;

// import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import MapSkeleton from "./Skeletons/MapSkeletion";

// const DeliveryMap = ({ setLocation }) => {
//   const [position, setPosition] = useState();

//   // position && console.log("position: ", position.latitude, position.longitude);

//   useEffect(() => {
//     if (navigator && navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((pos) => {
//         const coords = pos.coords;
//         setPosition(coords);
//         setLocation(coords);
//       });
//     }
//   }, []);

//   const defaultZoom = 19;

//   const mapStyle = {
//     height: "250px",
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

//   const moveMarker = (props, marker, e) => {
//     setPosition({
//       ...position,
//       latitude: e.latLng.lat(),
//       longitude: e.latLng.lng(),
//     });
//     setLocation({
//       latitude: e.latLng.lat(),
//       longitude: e.latLng.lng(),
//     });
//     console.log(e.latLng.lat(), e.latLng.lng());
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
//         draggable={true}
//         onDragend={moveMarker}
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
// })(DeliveryMap);
