import NavBar from "../Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
}
