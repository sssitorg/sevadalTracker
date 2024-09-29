import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <nav>
        <Link href="/pages/profile">
          <button>Profile</button>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
