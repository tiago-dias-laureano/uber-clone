"use client";

import React, { createContext, useEffect, useRef, useState } from "react";

interface MapContextProps {
  currentPosition: { lat: number; lng: number };
  originRef: React.RefObject<HTMLInputElement>;
  destinationRef: React.RefObject<HTMLInputElement>;
  routerPointer: Array<{ lat: number; lng: number }>;
  distanceValue: Number;
  direction: any;
  getInfoLocation: () => void;
}

export const MapContext = createContext({} as MapContextProps);

export const MapContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const originRef = useRef<HTMLInputElement | null>(null);
  const destinationRef = useRef<HTMLInputElement | null>(null);

  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [routerPointer, setRouterPointer] = useState([
    { lat: 0, lng: 0 },
    { lat: 0, lng: 0 },
  ]);

  const [distanceValue, setDistanceValue] = useState<number>(0);
  const [direction, setDirection] = useState<any>({});

  useEffect(() => {
    const successCallback = (position: any) => {
      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const errorCallback = (error: any) => {
      alert("Erro ao tentar pegar sua localização");
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  async function getInfoLocation() {
    const directionsService = new google.maps.DirectionsService();

    try {
      const result = await directionsService.route({
        origin: originRef.current?.value || "",
        destination: destinationRef.current?.value || "",
        travelMode: google.maps.TravelMode.DRIVING,
      });

      const legs = result.routes[0].legs[0];

      setRouterPointer([
        { lat: legs.start_location.lat(), lng: legs.start_location.lng() },
        { lat: legs.end_location.lat(), lng: legs.end_location.lng() },
      ]);

      const distanceValue = legs.distance?.value ?? 0;

      setDistanceValue(distanceValue);

      setDirection(result);
    } catch {
      alert("Erro ao traçar rota");
    }
  }

  return (
    <MapContext.Provider
      value={{
        currentPosition,
        originRef,
        destinationRef,
        routerPointer,
        direction,
        distanceValue,
        getInfoLocation,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
