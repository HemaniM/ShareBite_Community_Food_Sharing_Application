import AppRoutes from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AppRoutes />

      {/* ✅ Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
        className="sharebite-toast-container"
        toastClassName="sharebite-toast"
        bodyClassName="sharebite-toast-body"
        progressClassName="sharebite-toast-progress"
      />
    </>
  );
}

export default App;
