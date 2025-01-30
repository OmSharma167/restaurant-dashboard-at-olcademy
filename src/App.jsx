// ------------------------
// src/App.jsx
// ------------------------
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import DeliveryMenu from "./pages/DeliveryMenu";
import DineInMenu from "./pages/DineInMenu";
import TaxesAndCharges from "./pages/TaxesAndCharges";
import Offers from "./pages/Offers";
import OutletSettings from "./pages/OutletSettings";
import OutletInfo from "./pages/OutletInfo";
import Help from "./pages/Help";
import AddItemForm from "./components/AddItemForm";

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/delivery-menu" element={<DeliveryMenu />} />
        <Route path="/dine-in-menu" element={<DineInMenu />} />
        <Route path="/AddItemForm" element={< AddItemForm />} />
        <Route path="/taxes-charges" element={<TaxesAndCharges />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/outlet-settings" element={<OutletSettings />} />
        <Route path="/outlet-info" element={<OutletInfo />} />
        <Route path="/help" element={<Help />} />
        {/* If you need more pages, add them here */}
      </Route>
    </Routes>
  );
}
