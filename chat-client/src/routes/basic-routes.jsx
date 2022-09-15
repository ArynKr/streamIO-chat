import React from "react";
import { Routes, Route } from "react-router-dom";
import { RevirtChat } from "../containers/Chat";

import { Login } from "../containers/Login";
import { SignUp } from "../containers/SignUp";

export default function BasicRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback="Loading....">
            <Login />
          </React.Suspense>
        }
      />
      <Route
        path="/chat"
        element={
          <React.Suspense fallback="Loading...">
            <RevirtChat />
          </React.Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <React.Suspense fallback="Loading...">
            <SignUp />
          </React.Suspense>
        }
      />
    </Routes>
  );
}
