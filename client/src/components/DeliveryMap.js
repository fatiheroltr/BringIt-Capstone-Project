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

  const onLoad = (infoWindow) => {};

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
