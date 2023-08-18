"use client";
import React, { useState, useEffect, useCallback } from "react";

interface Props {
  children: React.ReactNode;
}

const ResizableWindow: React.FC<Props> = ({ children }: Props) => {
  const [width, setWidth] = useState<number>(() => {
    // Initialize the width from localStorage, or use 300 as the default
    return parseInt(localStorage.getItem("resizableWindowWidth") || "300");
  });

  const [isResizing, setIsResizing] = useState(false); // Track resizing state

  const handleResize = useCallback(
    (event: MouseEvent) => {
      if (isResizing) {
        setWidth(event.clientX);
      }
    },
    [isResizing]
  );

  const handleMouseDown = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Save the width to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resizableWindowWidth", width.toString());
  }, [width]);

  return (
    <div
      className="resizableWindow"
      style={{ width: `${width}px` }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default ResizableWindow;
