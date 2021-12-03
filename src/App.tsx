import { Route, Routes } from "react-router-dom";
import { Callback } from "./pages/callback";
import { Home } from "./pages/home";
import { NotFound } from "./pages/not-found";
import "./App.css";

export const App = () => {
  return (
    <div className="App">
      <h1>Gaming</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
