import styles from '../styles/components/Slider.module.css';
import React, { useState, useEffect, useRef } from 'react';
import SlidersampleA from '../assets/images/dollsTh.jpg';
import SlidersampleB from '../assets/images/robotTh.jpg';
import SlidersampleC from '../assets/images/ducksTh.jpg';
import SlidersampleD from '../assets/images/cars.jpg';
import SlidersampleE from '../assets/images/boardgameTh.jpg';
import SlidersampleF from '../assets/images/childroomTh.jpg';

const Aimages: string[] = [
  SlidersampleA,
  SlidersampleB,
  SlidersampleC,
  SlidersampleD,
  SlidersampleE,
  SlidersampleF,
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    if (currentIndex === Aimages.length + 1) {
      setCurrentIndex(1);
      if (sliderRef.current) {
        sliderRef.current.style.transition = 'none';
        sliderRef.current.style.transform = `translateX(-100%)`;
      }
    } else if (currentIndex === 0) {
      setCurrentIndex(Aimages.length);
      if (sliderRef.current) {
        sliderRef.current.style.transition = 'none';
        sliderRef.current.style.transform = `translateX(-${
          Aimages.length * 100
        }%)`;
      }
    }

    setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.style.transition = 'transform 1s ease-in-out';
      }
    }, 50);
  };

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      handleNextClick();
    }, 5000);
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

    return () => {
      stopAutoSlide();
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

    restartAutoSlide();
  };

  const handleNextClick = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);

    restartAutoSlide();
  };

  useEffect(() => {
    if (sliderRef.current && isTransitioning) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <div className={styles.slider}>
      <div
        className={styles.slider__images}
        ref={sliderRef}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className={styles.slide}>
          <img
            src={Aimages[Aimages.length - 1]}
            alt={`Slide ${Aimages.length - 1}`}
          />
        </div>

        {Aimages.map((image, index) => (
          <div key={index} className={styles.slide}>
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}

        <div className={styles.slide}>
          <img src={Aimages[0]} alt='Slide 0' />
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
