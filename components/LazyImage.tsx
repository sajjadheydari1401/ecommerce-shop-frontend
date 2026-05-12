"use client";
import { useState } from "react";
import Image from "next/image";
import resolveImage from "../utils/image";

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

      <Image
        src={resolveImage(src)}
        unoptimized
        fill
        alt={alt || ""}
        onLoad={() => setLoaded(true)}
        className={`block ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
