import { useState } from 'react'
import './App.css'
import { useEffect } from "react";
import Home from "./Home";

function App() {
  useEffect(() => {
    const handleMouseMove = (event) => {
      document.documentElement.style.setProperty(
        "--cursor-x",
        `${event.clientX}px`,
      );

      document.documentElement.style.setProperty(
        "--cursor-y",
        `${event.clientY}px`,
      );
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="cursor-glow"></div>

      <Home />
    </>
  );
}

export default App;
