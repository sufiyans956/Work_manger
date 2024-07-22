"use client"
import Image from "next/image";
import ximg from "../../public/homeimg.jpg";

export default function Home() {
  const mystyle = {
    backgroundImage: `url('/homeimg.jpg')`,
    backgroundSize: "cover",
    height: "100vh", // or any other height you need
    width: "100%",
  
    filter: "blur(1px)",
    opacity: 0.5,
  };

  const textStyle = {
    zIndex: 10,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  };

  return (
    <>
      <div style={mystyle}></div>
      <div style={textStyle}>
        <h1 className="text-6xl shadow-lg shadow-blue-300 text-white rounded-xl p-2 ">The Art of Consistency</h1>
      </div>
    </>
  );
}
