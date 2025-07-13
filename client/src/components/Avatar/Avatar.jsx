import React from "react";
import { FaUser } from "react-icons/fa";

const Avatar = ({ src, alt = "User Avatar", size = 48 }) => {
  // size will be used for both height and width (square avatar)
  const style = {
    height: size,
    width: size,
    borderRadius: "50%",
    objectFit: "cover",
    backgroundColor: "#ddd", // fallback background color
    display: "inline-block",
    color: "var(--primary)", // for fallback icon color
  };

  return src ? (
    <img src={src} alt={alt} style={style} />
  ) : (
    <div style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <FaUser size={size * 0.6} />
    </div>
  );
};

export default Avatar;
