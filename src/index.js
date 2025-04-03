import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Index from "views/Index";
import SearchResults from "views/examples/searchresults";
import ContactDetails from "views/examples/contactdetails";
import RequestUpdate from "views/examples/requestupdate"; // Import the new update page
import Advertise from "views/examples/advertise"; // Import the new update page
import Results from "views/examples/results";
import SavedContacts from "views/examples/savedcontacts";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/" element={<Index />} />
      <Route path="/searchresults" element={<SearchResults />} />
      <Route path="/contactdetails" element={<ContactDetails />} />
      <Route path="/request-update" element={<RequestUpdate />} /> {/* New page */}
      <Route path="/advertise" element={<Advertise />} /> {/* New page */}
      <Route path="/contactsdirectory" element={<SavedContacts />} /> {/* New page */}
      <Route path="/results" element={<Results />} /> {/* New page */}
      <Route path="*" element={<Navigate to="/admin/index" replace />} />
      
    </Routes>
  </BrowserRouter>
);
