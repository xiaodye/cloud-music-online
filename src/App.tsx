import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <div className="App">
      <h2>App</h2>
      <hr />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
