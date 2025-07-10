import React, { useState } from 'react';
import { getBackendImageUrl } from '../../../../utils/backend-image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = ({ imageUrls, itemName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!imageUrls || imageUrls.length === 0) {
    return (
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No Image Available</p>
      </div>
    );
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imageUrls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === imageUrls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
      <img
        src={getBackendImageUrl(imageUrls[currentIndex])}
        alt={`${itemName} - Image ${currentIndex + 1}`}
        className="w-full h-full object-cover"
        onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Image+Error'; }}
      />
      <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
        {currentIndex + 1} / {imageUrls.length}
      </div>
      {imageUrls.length > 1 && (
        <>
          <button onClick={goToPrevious} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white">
            <ChevronLeft size={24} />
          </button>
          <button onClick={goToNext} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white">
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageGallery;
