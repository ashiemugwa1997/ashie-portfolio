import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

function App() {
  console.log("Rendering App component...");

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && <TempoRoutes />}
      </>
    </Suspense>
  );
}

function TempoRoutes() {
  const routing = useRoutes(routes);
  return routing;
}

export default App;
