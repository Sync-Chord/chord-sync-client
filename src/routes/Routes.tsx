import { Suspense } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/common/Loader";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
const Routes = () => {
  const { user } = useSelector((state: any) => state.auth);

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
