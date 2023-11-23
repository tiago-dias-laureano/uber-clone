"use client";

import { useContext } from "react";
import { MapContext } from "../Context/MapContext";

import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

import Map from "./Map";
import CarList from "./CarList";

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

          {isLoaded && (
            <div className="flex flex-col gap-4 mt-8">
              <Autocomplete>
                <input
                  ref={originRef}
                  type="text"
                  name="loc"
                  id="loc"
                  placeholder="Pickup Origin"
                  className="w-full border p-4 bg-[#DFE3EF] placeholder:text-black rounded-lg"
                />
              </Autocomplete>

              <Autocomplete>
                <input
                  ref={destinationRef}
                  type="text"
                  name="dest"
                  id="dest"
                  placeholder="Pickup Destination"
                  className="w-full border p-4 bg-[#DFE3EF] placeholder:text-black rounded-lg"
                />
              </Autocomplete>
            </div>
          )}

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
