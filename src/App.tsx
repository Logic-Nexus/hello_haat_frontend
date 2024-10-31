import "./App.css";

import { RouterProvider } from "react-router-dom";
import appRouter from "./constant/router";

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
