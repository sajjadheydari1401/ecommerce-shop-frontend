import LazyImage from "@/components/LazyImage";

interface Props {
  images: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
  productName: string;
}

export const ThumbnailList = ({
  images,
  currentIndex,
  onSelect,
  productName,
}: Props) => {
  return (
    <div className="mt-4 flex gap-2 overflow-auto pb-2">
      {images.map((img, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`w-24 h-24 shrink-0 border-2 rounded-lg transition-colors overflow-hidden ${
            idx === currentIndex
              ? "border-blue-600 ring-2 ring-blue-200"
              : "border-transparent hover:border-gray-300"
          }`}
        >
          <LazyImage
            src={img}
            alt={`${productName} - Image ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
};
