// pages/map.js

import axios from "axios";
import useSWR from "swr";
import Map from "../components/Map";

const fetcher = async (url) =>
  await axios.get(url).then((res) => res.data.inregion);

const MapApp = () => {
  // swr
  const address = "/api/inregion";
  const { data, error } = useSWR(address, fetcher, {
    revalidateOnFocus: true,
  });

  //
  if (error) <h1>Loading failed...</h1>;
  if (!data) <h1>Loading...</h1>;

  //
  let mapdata = {
    type: "FeatureCollection",
    features: data,
  };
  console.log("map data", mapdata);

  //
  return (
    <>
      <div className="container mt-6">
        <div className="row">
          <div className="col">
            <Map mapdata={mapdata} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MapApp;
