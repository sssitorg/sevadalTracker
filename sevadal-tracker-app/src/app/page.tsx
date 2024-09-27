import Link from "next/link";
import Navbar from "./components/Navbar";
const HomePage: React.FC = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <Navbar />
        <h1>Welcome to the Sevadal Tracking App (Home page)</h1>
      </div>
    </div>
  );
};

export default HomePage;
