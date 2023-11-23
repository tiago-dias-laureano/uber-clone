import { useContext } from "react";
import { MapContext } from "../Context/MapContext";

import { MdLocalTaxi } from "react-icons/md";
import { RiTaxiWifiLine } from "react-icons/ri";

export default function CarList() {
  const { distanceValue } = useContext(MapContext);
  return (
    <div className="mt-5">
      <span className="text-xl font-bold flex flex-col gap-8 border p-4 ">
        <div className="item border p-2">
          <div className="">
            <div className="content flex justify-between items-center">
              <div className="img">
                <MdLocalTaxi className="text-4xl" />
              </div>

              <div className="desc flex flex-col text-right">
                <span className="font-bold text-base">Taxi GO</span>
                <span className="font-bold text-lg">
                  $ {((Number(distanceValue) / 1000) * 0.85).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="item border p-2">
          <div className="card">
            <div className="content flex justify-between items-center">
              <div className="img">
                <RiTaxiWifiLine className="text-4xl" />
              </div>

              <div className="desc flex flex-col text-right">
                <span className="font-bold text-base">Taxi PRO</span>
                <span className="font-bold text-lg">
                  $ {((Number(distanceValue) / 1000) * 1.2).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
}
