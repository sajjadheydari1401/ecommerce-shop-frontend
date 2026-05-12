import { AppButton } from "./AppButton";

interface ImageNavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

export const ImageNavigation = ({ onPrev, onNext }: ImageNavigationProps) => {
  return (
    <>
      <AppButton
        onClick={onPrev}
        isGhost
        variant="secondary"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 !px-2 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
        aria-label="Previous image"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </AppButton>

      <AppButton
        onClick={onNext}
        isGhost
        variant="secondary"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 !px-2 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
        aria-label="Next image"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </AppButton>
    </>
  );
};
