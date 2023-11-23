import { useCallback, useContext, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

import { MapContext } from "../Context/MapContext";

export default function Map() {
  const {
    currentPosition,
    destinationRef,
    originRef,
    routerPointer,
    direction,
  } = useContext(MapContext);

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds({
      lat: currentPosition.lat,
      lng: currentPosition.lng,
    });
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      mapContainerStyle={{
        width: "100%",
        height: "calc(100vh - 108px)",
      }}
      center={{
        lat: currentPosition.lat,
        lng: currentPosition.lng,
      }}
    >
      {originRef && destinationRef && (
        <>
          <Marker
            position={{ lat: routerPointer[0].lat, lng: routerPointer[0].lng }}
          />
          <Marker
            position={{ lat: routerPointer[1].lat, lng: routerPointer[1].lng }}
          />

          <DirectionsRenderer
            directions={direction}
            options={{
              polylineOptions: {
                strokeColor: "black",
                strokeWeight: 5,
              },
            }}
          />
        </>
      )}
    </GoogleMap>
  );
}
