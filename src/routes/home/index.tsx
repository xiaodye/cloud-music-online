import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Home;
