// ------------------------
// src/App.jsx
// ------------------------
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
// import DashboardHome from "./pages/DashboardHome";
import DeliveryMenu from "./pages/DeliveryMenu";
import DineInMenu from "./pages/DineInMenu";
import Offers from "./pages/Offers";
// import OutletSettings from "./pages/OutletSettings";
import OutletInfo from "./pages/OutletInfo";
import Help from "./pages/Help";
import AddItemForm from "./components/Dining_Takeaway_Menu_Management/AddItemForm";
import TaxesAndCharges from "./components/TaxesAndCharges/TaxAndCharges";
import ManageTiffinSeeting from "./pages/ManageTiffinSeeting";
import OutletDashboard from "./components/OutletSetting/OutletDashboard";
import OrderManag from "./components/OrderManage/OrderManag";
import RestaurantReviews from "./components/RestaurantReviews/RestaurantReviews";
import RestaurantDashboard from "./components/Dashboard/RestaurantDashboard";
import AllOutletdata from "./components/Dashboard/AllOutletdata/AllOutletdata";
import MapExistingItem from "./components/Dining_Takeaway_Menu_Management/MapExistingItem";

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<RestaurantDashboard />} />
        {/* <Route path="/" element={<DashboardHome />} /> */}
        {/* <Route path="/delivery-menu" element={<DeliveryMenu />} />
        <Route path="/dine-in-menu" element={<DineInMenu />} /> */}
        <Route
          path="/delivery-menu"
          element={<DeliveryMenu showServiceType="Dine-in" />}
        />
        <Route
          path="/dine-in-menu"
          element={<DineInMenu showServiceType="Takeaway" />}
        />
        {/* <Route
          path="/delivery-menu"
          element={<MapExistingItem serviceType="Takeaway" />}
        />
        <Route
          path="/dine-in-menu"
          element={<MapExistingItem serviceType="Dine-in" />}
        /> */}
        <Route path="/add-item" element={<AddItemForm />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/outlet-settings" element={<OutletDashboard />} />
        <Route path="/outlet-info" element={<ManageTiffinSeeting />} />
        <Route path="/outlet-info" element={<OutletInfo />} />
        <Route path="Restaurant-Reviews" element={<RestaurantReviews />} />
        <Route path="/help" element={<Help />} />
        <Route path="/taxes-charges" element={<TaxesAndCharges />} />
        <Route path="/OrderManag" element={<OrderManag />} />
        <Route path="/AllOutletdata" element={<AllOutletdata />} />

        {/* If you need more pages, add them here */}
      </Route>
    </Routes>
  );
}
