import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/custom/Header";
import CreateTrip from "./Pages/CreateTrip";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./Pages/ViewTrip";
import MyTrips from "./Pages/MyTrips";
import Footer from "./components/custom/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path : "/view-trip/:tripId",
    element : <ViewTrip/>,
  },
  {
    path : "/my-trips",
    element : <MyTrips/>
  }
]);

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed top-0 left-0 w-full h-full object-cover -z-10"
    >
      <source src="/hero1.mp4" type="video/mp4" />
    </video>

    {/* Overlay (optional, for readability) */}
    <div className="absolute  bg-black/50 -z-5"></div>

    <Header />
    <RouterProvider router={router} />
    <Footer/>
    <Toaster />
  </GoogleOAuthProvider>
);
