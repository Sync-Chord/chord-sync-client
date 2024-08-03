import React, { Suspense } from "react";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/common/Loader";
const Routes = () => {
  const user = null;

  return (
    <Suspense fallback={<Loader />}>
      <ToastContainer
        pauseOnFocusLoss={false}
        position="top-center"
        pauseOnHover={false}
        autoClose={2000}
      />

      {user ? <PrivateRoutes /> : <PublicRoutes />}
    </Suspense>
  );
};

export default Routes;
