import Navbar from "./components/Navbar";
import Image from "next/image";

const HomePage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Image
        src="/sai emblum logo.png"
        alt="Logo"
        width={100}
        height={100}
        style={{ width: "100px", height: "auto" }}
      />
      <br />
      <br />
      <h1> Welcome to the Sevadal Tracking App</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Go to: </h2> <br /> <br />
        <Navbar />
      </div>
    </div>
  );
};

export default HomePage;
