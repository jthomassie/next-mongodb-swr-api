// pages/index.js

import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import Navs from "../components/Navs";

const fetcher = async (url) =>
  await axios.get(url).then((res) => res.data.features);

const Features = () => {
  // useSwr
  const address = "/api/features";
  const { data, error } = useSWR(address, fetcher);

  if (error) <h1>Loading failed...</h1>;
  if (!data) <h1>Loading features...</h1>;

  return (
    <>
      <div className="container mt-6">
        <div className="row">
          <div className="col-3">
            <Navs />
          </div>
          <div className="col-9">
            <h1>Features</h1>
            {data && (
              <ul className="list-unstyled">
                {data.map((d, i) => (
                  <li key={i}>
                    <Link href="/feature/[id]" as={`/feature/${d._id}`}>
                      <a>{`${d.properties.SUBTYPE}: ${d._id}`}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
