import Banner from "./Banner/Banner";
import Featured from "./Featured/Featured";

const Home = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto ">
        <Banner />
        <Featured />
      </div>
    </div>
  );
};

export default Home;
