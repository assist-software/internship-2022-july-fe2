import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import {
  AddEdit,
  Confirmation,
  Favorites,
  Home,
  Listing,
  MyAccount,
  Onboarding,
  Selim,
  Catalin,
  Andrei,
  Sabin,
} from "./pages";

import { Header } from "./components";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {/* rute protejate */}
        <Route
          element={
            <>
              <Header />
              <ProtectedRoute />
            </>
          }
        >
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/edit" element={<AddEdit />} />
        </Route>
        {/* rute publice */}
        <Route
          element={
            <>
              <Header /> <Outlet />
            </>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          {/* <Route path="/onboarding" element={<Onboarding />} />   */}
        </Route>

        <Route path="/login" element={<Onboarding />} />
        <Route path="/register" element={<Onboarding />} />
        <Route path="/forgot-password" element={<Onboarding />} />
        <Route path="/reset-password" element={<Onboarding />} />

        {/* test */}
        <Route path="/selim" element={<Selim />} />
        <Route path="/catalin" element={<Catalin />} />
        <Route path="/andrei" element={<Andrei />} />
        <Route path="/sabin" element={<Sabin />} />
      </Routes>
    </Router>
  );
}

export default App;
