"use client";

import { useContext } from "react";
import { MapContext } from "../Context/MapContext";

import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

import Map from "./Map";
import CarList from "./CarList";
import AutocompleteComponent from "./AutocompleteInput";

export default function Grid() {
  const { destinationRef, originRef, routerPointer, getInfoLocation } =
    useContext(MapContext);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBk-LOLY38kgtSD54TbOLzxILoi_aImddU",
    libraries: ["places"],
  });

  return (
    <section className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="search">
        <div className="card p-2 md:p-6 border roundend-xl">
          <p className="text-xl font-bold">Get a ride</p>

          {isLoaded && <AutocompleteComponent />}

          <button
            className="bg-black w-full my-4 p-4 rounded-lg text-white"
            onClick={getInfoLocation}
          >
            Search
          </button>
        </div>
        {routerPointer[0].lat !== 0 && <CarList />}
      </div>
      <div className="map w-full col-span-2">{isLoaded && <Map />}</div>
    </section>
  );
}
