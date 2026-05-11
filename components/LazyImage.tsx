"use client";
import React, { useState } from "react";

export default function LazyImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className || ""}`}>
      {!loaded && <div className="skeleton w-full h-full absolute inset-0" />}
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`block w-full h-full object-contain ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
