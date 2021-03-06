import { Route, Routes } from "react-router-dom";
import { ManifestContextManager } from "./contexts/manifest-context";
import { UserContextManager } from "./contexts/user-context";
import { Callback } from "./pages/callback";
import { Home } from "./pages/home";
import { NotFound } from "./pages/not-found";
import "./App.css";

export const App = () => {
  return (
    <UserContextManager>
      <ManifestContextManager>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </ManifestContextManager>
    </UserContextManager>
  );
};
