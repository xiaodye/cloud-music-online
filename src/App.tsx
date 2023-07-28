import { Outlet } from "react-router-dom";
import Player from "./baseUI/Player";
import Drawer from "./components/Drawer";

function App() {
  return (
    <div className="App">
      <Outlet />
      <Drawer />
      <Player />
    </div>
  );
}

export default App;
