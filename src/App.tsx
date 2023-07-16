import { RouterProvider } from "react-router-dom";
import router from "./router";
// import Player from "./baseUI/Player";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <Player /> */}
    </div>
  );
}

export default App;
