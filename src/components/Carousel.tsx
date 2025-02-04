import { classNameMerge } from '@/utils/classNameMerge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactElement, useRef, useState } from 'react';

interface CarouselProps<T> {
  items: T[];
  children: (item: T) => ReactElement;
}

const Carousel = <T,>({ items, children }: CarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    console.log(currentIndex);
    if (currentIndex === items.length - 1) return;
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, items.length - 1));
      setIsSliding(false);
    }, 50);
  };

  const prevSlide = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      setIsSliding(false);
    }, 50);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    if (carouselRef.current) {
      setTranslateX(carouselRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    if (carouselRef.current) {
      const diffX = startX - e.clientX;
      carouselRef.current.scrollLeft = translateX + diffX;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      const newIndex = Math.round(carouselRef.current.scrollLeft / carouselRef.current.clientWidth);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="relative p-4">
      <div
        className={classNameMerge(
          'pointer-events-none absolute left-0 top-0 z-10 h-full w-[200px]',
          currentIndex > 0 && 'bg-gradient-to-r from-default-100/85',
        )}
      ></div>
      <div
        className={classNameMerge(
          'pointer-events-none absolute right-0 top-0 z-10 h-full w-[200px]',
          currentIndex < items.length && 'bg-gradient-to-l from-default-100/85',
        )}
      ></div>
      {currentIndex > 0 && (
        <ChevronLeft
          role="button"
          className="absolute left-0 top-[45%] z-20 h-8 w-8 cursor-pointer rounded-full border border-default-300 bg-default-100 p-1 text-text-grey"
          onClick={prevSlide}
        />
      )}
      <div
        className="relative w-full overflow-hidden rounded-lg"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="flex w-1/2 gap-4 transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 50}%)` }}
        >
          {items.map((item, index) => (
            <div key={index}>{children(item)}</div>
          ))}
        </div>
      </div>
      <ChevronRight
        role="button"
        className="absolute right-0 top-[45%] z-20 h-8 w-8 cursor-pointer rounded-full border border-default-300 bg-default-100 p-1 text-text-grey"
        onClick={nextSlide}
      />
    </div>
  );
};

export default Carousel;
