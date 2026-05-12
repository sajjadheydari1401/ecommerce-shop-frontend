"use client";
import { useState } from "react";
import LazyImage from "@/components/LazyImage";
import { ImageNavigation } from "../common/ImageNavigation";
import { ThumbnailList } from "./ThumbnailList";

interface ProductGalleryProps {
  product: any;
}

export const ProductGallery = ({ product }: ProductGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images?.length ? product.images : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (images.length === 0) {
    return (
      <div className="md:col-span-2 text-gray-500">No image available</div>
    );
  }

  return (
    <div className="md:col-span-2">
      {/* Main Image Container */}
      <div className="relative h-96 bg-white dark:bg-gray-800 flex items-center justify-center rounded-lg">
        <LazyImage
          src={images[currentImageIndex]}
          alt={product.name}
          className="h-96 w-full object-contain"
        />

        {images.length > 1 && (
          <ImageNavigation onPrev={prevImage} onNext={nextImage} />
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <ThumbnailList
          images={images}
          currentIndex={currentImageIndex}
          onSelect={setCurrentImageIndex}
          productName={product.name}
        />
      )}
    </div>
  );
};
