import { Outlet } from "react-router-dom";
import Player from "./baseUI/Player";

function App() {
  return (
    <div className="App">
      <Outlet />
      <Player />
    </div>
  );
}

export default App;
