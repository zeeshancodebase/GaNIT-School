// Layout.jsx
import React from "react";
import Navbar from "../components/Navbar/Navbar";
// import BottomNav from "./BottomNav/BottomNav";
// import { useDeviceSize } from "../../context/DeviceSizeContext";

const Layout = ({ children }) => {
  // const { isMobile } = useDeviceSize();

  return (
    <>
      
      <Navbar />

      <main>{children}</main>

      {/* {isMobile && <BottomNav /> }  */}
    </>
  );
};

export default Layout;
