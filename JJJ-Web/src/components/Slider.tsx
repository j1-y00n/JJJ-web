import styles from '../styles/components/Slider.module.css';
import React, { useState, useEffect, useRef } from 'react';
// import SlidersampleA from '../assets/images/dollsTh.jpg';
// import SlidersampleB from '../assets/images/robotTh.jpg';
// import SlidersampleC from '../assets/images/ducksTh.jpg';
// import SlidersampleD from '../assets/images/cars.jpg';
// import SlidersampleE from '../assets/images/boardgameTh.jpg';
// import SlidersampleF from '../assets/images/childroomTh.jpg';
import { getSliderImages } from '../services/productServices';

// const sliderImages: string[] = [
//   SlidersampleA,
//   SlidersampleB,
//   SlidersampleC,
//   SlidersampleD,
//   SlidersampleE,
//   SlidersampleF,
// ];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [sliderImages, setSliderImages] = useState<string[]>([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const sliderImages = await getSliderImages();
        setSliderImages(sliderImages.map((image) => image.imageUrl));
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    if (currentIndex === 0) {
      setCurrentIndex(sliderImages.length);
    } else if (currentIndex === sliderImages.length + 1) {
      setCurrentIndex(1);
    }
  };

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      handleNextClick();
    }, 3500);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const restartAutoSlide = () => {
    stopAutoSlide();
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopAutoSlide();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleVisibilityChange = () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  };

  const handlePrevClick = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
    // stopAutoSlide(); // 버튼 클릭 시 자동 슬라이드 일시 정지
    // setTimeout(restartAutoSlide, 3000); // 3초 후 자동 슬라이드 재시작
    restartAutoSlide();
  };

  const handleNextClick = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    // stopAutoSlide(); // 버튼 클릭 시 자동 슬라이드 일시 정지
    // setTimeout(restartAutoSlide, 3000); // 3초 후 자동 슬라이드 재시작
    restartAutoSlide();
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = isTransitioning
        ? 'transform 1s ease-in-out'
        : 'none';
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex, isTransitioning]);

  return (
    <div className={styles.slider}>
      <div
        className={styles.slider__images}
        ref={sliderRef}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className={styles.slide}>
          <img
            src={sliderImages[sliderImages.length - 1]}
            alt={`Slide ${sliderImages.length - 1}`}
          />
        </div>

        {sliderImages.map((image, index) => (
          <div key={index} className={styles.slide}>
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}

        <div className={styles.slide}>
          <img src={sliderImages[0]} alt='Slide 0' />
        </div>
      </div>
      <button className={styles.prev} onClick={handlePrevClick}>
        &#10094;
      </button>
      <button className={styles.next} onClick={handleNextClick}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;
