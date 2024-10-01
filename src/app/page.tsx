import Navbar from "./components/Navbar";

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
      <img
        src="/sai emblum logo.png"
        alt="Logo"
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
        <h2 style={{ margin: 0 }}>Let's go to: </h2> <br /> <br />
        <Navbar />
      </div>
    </div>
  );
};

export default HomePage;
