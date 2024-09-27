import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <h1>Welcome to the Sevadal tracking app, Homepage </h1>
      <nav>
        <Link href="/pages/profile">
          <button>Profile</button>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
