import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar";
import Footer from "../Shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-[calc(100vh-295px)] banner">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
