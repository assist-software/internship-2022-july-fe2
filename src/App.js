import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  AddEdit,
  Confirmation,
  Favorites,
  Home,
  Listing,
  MyAccount,
  Onboarding,
} from "./pages";

import { Header } from "./components";

import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* rute protejate */}
        <Route element={<ProtectedRoute />}>
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/edit" element={<AddEdit />} />
        </Route>
        {/* rute publice */}
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </Router>
  );
}

export default App;
