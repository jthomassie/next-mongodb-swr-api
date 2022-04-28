// components/Navs.js

import Link from "next/link";

const Navs = () => {
  return (
    <>
      <ul className="list-unstyled">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/map">
            <a>Map</a>
          </Link>
        </li>
        <li>
          <Link href="/add-feature">
            <a>Add Feature</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Navs;
