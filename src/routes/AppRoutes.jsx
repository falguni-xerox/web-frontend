import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import AdminLayout from "../components/layout/AdminLayout";

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
import AdminSmartPrinting from "../pages/admin/AdminSmartPrinting";
import AdminInvoices from "../pages/admin/AdminInvoices";

import SmartPrintingLanguage from "../pages/SmartPrintingLanguage";
import SmartPrintingDetails from "../pages/SmartPrintingDetails";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================
            PUBLIC WEBSITE
        ================================= */}

        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/services"
          element={
            <Layout>
              <Services />
            </Layout>
          }
        />

        <Route
          path="/gallery"
          element={
            <Layout>
              <Gallery />
            </Layout>
          }
        />

        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />

        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />


        {/* =================================
            SMART PRINTING SYSTEM
        ================================= */}

        <Route
          path="/smart-printing-system"
          element={
            <SmartPrintingLanguage />
          }
        />

        <Route
          path="/smart-printing-system/:language"
          element={
            <SmartPrintingDetails />
          }
        />
        <Route
  path="/admin/invoices"
  element={
    <AdminLayout>
      <AdminInvoices />
    </AdminLayout>
  }
/>


        {/* =================================
            ADMIN
        ================================= */}

        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/service-categories"
          element={
            <AdminLayout>
              <AdminServiceCategories />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/services"
          element={
            <AdminLayout>
              <AdminServices />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/smart-printing"
          element={
            <AdminLayout>
              <AdminSmartPrinting />
            </AdminLayout>
          }
        />


        {/* =================================
            404
        ================================= */}

        <Route
          path="*"
          element={
            <NotFound />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;