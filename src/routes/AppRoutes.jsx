import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Gallery from "../pages/Gallery";
import Home from "../pages/Home";
import Services from "../pages/Services";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminSettings from "../pages/admin/AdminSettings";
import AdminServiceCategories from "../pages/admin/AdminServiceCategories";
import AdminServices from "../pages/admin/AdminServices";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          {/* PUBLIC WEBSITE */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/gallery"
            element={<Gallery />}
          />


          {/* ADMIN */}

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/settings"
            element={<AdminSettings />}
          />

          <Route
            path="/admin/service-categories"
            element={<AdminServiceCategories />}
          />

          <Route
            path="/admin/services"
            element={<AdminServices />}
          />


          {/* 404 */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRoutes;