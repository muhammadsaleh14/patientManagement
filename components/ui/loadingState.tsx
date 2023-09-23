import React from "react";

const dotsStyle = {
  width: "3em",
  height: "3em",
  display: "grid",
  gridTemplateRows: "repeat(3, 1fr)",
  gridTemplateColumns: "repeat(3, 1fr)",
  justifyItems: "center",
  alignItems: "center",
};

const dotStyle = {
  width: "75%",
  height: "75%",
  backgroundColor: "#3cefff",
  animation: "fadeRotate 2s alternate ease-in-out infinite",
};

const LoadingState = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div style={dotsStyle} className="dots">
        <div style={dotStyle}></div>
        <div style={dotStyle}></div>
        <div style={dotStyle}></div>
        <div style={dotStyle}></div>
        <div style={dotStyle}></div>
        <div style={dotStyle}></div>
        <div style={dotStyle}></div>
        <div style={dotStyle}></div>
        <div style={dotStyle}></div>
      </div>
      <style>
        {`
          @keyframes fadeRotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingState;
