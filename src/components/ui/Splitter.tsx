"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface SplitterProps {
  direction?: "horizontal" | "vertical";
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  onResize?: (size: number) => void;
}

const Splitter = ({
  direction = "horizontal",
  minSize = 200,
  maxSize = 600,
  defaultSize = 280,
  onResize,
}: SplitterProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = useState(defaultSize);
  const splitterRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef(0);
  const startSizeRef = useRef(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      startPosRef.current = direction === "horizontal" ? e.clientX : e.clientY;
      startSizeRef.current = size;
    },
    [direction, size]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const currentPos = direction === "horizontal" ? e.clientX : e.clientY;
      const delta = currentPos - startPosRef.current;
      let newSize = startSizeRef.current + delta;

      // Clamp to min/max
      newSize = Math.max(minSize, Math.min(maxSize, newSize));

      setSize(newSize);
      onResize?.(newSize);
    },
    [isDragging, direction, minSize, maxSize, onResize]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor =
        direction === "horizontal" ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp, direction]);

  const isHorizontal = direction === "horizontal";

  return (
    <div
      ref={splitterRef}
      onMouseDown={handleMouseDown}
      className={`
        ${isHorizontal ? "w-1 cursor-col-resize" : "h-1 cursor-row-resize"}
        bg-gray-200 hover:bg-blue-400 transition-colors duration-150
        flex-shrink-0 relative group
        ${isDragging ? "bg-blue-500" : ""}
      `}
    >
      {/* Larger hit area */}
      <div
        className={`
          absolute 
          ${isHorizontal ? "inset-y-0 -left-1 -right-1" : "inset-x-0 -top-1 -bottom-1"}
          z-10
        `}
      />
      {/* Visual indicator */}
      <div
        className={`
          absolute opacity-0 group-hover:opacity-100 transition-opacity
          ${isHorizontal ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8" : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-8"}
          bg-blue-500
        `}
      />
    </div>
  );
};

export { Splitter };
export type { SplitterProps };
