import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar";
import Footer from "../Shared/Footer";

const MainLayout = () => {
  return (
    <div>
      {/* <h1 className="text-5xl text-[#FF6600]">MainLayout</h1> */}
      <NavBar />
      <div className="min-h-[calc(100vh-295px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
