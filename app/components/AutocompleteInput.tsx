import { Autocomplete } from "@react-google-maps/api";
import { useContext } from "react";
import { MapContext } from "../Context/MapContext";

export default function AutocompleteComponent() {
  const { destinationRef, originRef } = useContext(MapContext);

  return (
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
  );
}
