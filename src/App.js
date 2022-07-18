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
  Layout,
  Details,
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
        <Route
          element={
            <>
              <Header />
              <Layout>
                <ProtectedRoute />
              </Layout>
            </>
          }
        >
          {/* protected routes */}
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/edit" element={<AddEdit />} />
        </Route>

        <Route
          element={
            <>
              <Header />
              <Layout>
                <Outlet />
              </Layout>
            </>
          }
        >
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/listing/:id" element={<Details />} />
        </Route>

        {/* onboarding routes */}
        <Route path="/login" element={<Onboarding />} />
        <Route path="/register" element={<Onboarding />} />
        <Route path="/forgot-password" element={<Onboarding />} />
        <Route path="/reset-password" element={<Onboarding />} />

        {/* test routes */}
        <Route path="/selim" element={<Selim />} />
        <Route path="/catalin" element={<Catalin />} />
        <Route path="/andrei" element={<Andrei />} />
        <Route path="/sabin" element={<Sabin />} />
      </Routes>
    </Router>
  );
}

export default App;
