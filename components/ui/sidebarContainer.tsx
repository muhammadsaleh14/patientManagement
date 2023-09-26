import React, { useState, useRef, useCallback, useEffect } from "react";

export default function SidebarContainer({
  children,
  itemInLS,
}: {
  children: React.ReactNode;
  itemInLS: string;
}) {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  let width;
  if (typeof localStorage !== "undefined") {
    width = localStorage.getItem(itemInLS);
  }
  const [sidebarWidth, setSidebarWidth] = useState<number>(
    width ? parseInt(width) : 268
  );

  const startResizing = useCallback((mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        const width =
          mouseMoveEvent.clientX -
          sidebarRef.current.getBoundingClientRect().left;
        setSidebarWidth(width);
        localStorage.setItem(itemInLS, width.toString());
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div className="app-container h-auto">
      <div
        ref={sidebarRef}
        className="app-sidebar"
        style={{ width: sidebarWidth }}
        // onMouseDown={(e) => e.preventDefault()}
      >
        {children}
        {/* <div className="app-sidebar-content" /> */}
        <div className="app-sidebar-resizer" onMouseDown={startResizing} />
      </div>
      {/* <div className="app-frame" /> */}
    </div>
  );
}
