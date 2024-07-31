import styles from "../styles/components/Slider.module.css";

import React, { useState, useEffect, useRef, useCallback } from "react";

import SlidersampleA from "../assets/images/balloon.jpg";
import SlidersampleB from "../assets/images/boardgame.jpg";
import SlidersampleC from "../assets/images/book.jpg";
import SlidersampleD from "../assets/images/cars.jpg";
import SlidersampleE from "../assets/images/exam02.jpg";

// interface ImageSliderProps {
//   images: string[];
// }

const Aimages: string[] = [
  SlidersampleA,
  SlidersampleB,
  SlidersampleC,
  SlidersampleD,
  SlidersampleE,
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === Aimages.length + 1) {
      setCurrentIndex(1);
      if (sliderRef.current) {
        sliderRef.current.style.transition = "none";
        sliderRef.current.style.transform = `translateX(-100%)`;
      }
    } else if (currentIndex === 0) {
      setCurrentIndex(Aimages.length);
      if (sliderRef.current) {
        sliderRef.current.style.transition = "none";
        sliderRef.current.style.transform = `translateX(-${
          Aimages.length * 100
        }%)`;
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 3000); // 3초마다 슬라이드 변경

    return () => clearInterval(interval);
  }, [Aimages.length]);

  const handlePrevClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    if (sliderRef.current && isTransitioning) {
      sliderRef.current.style.transition = "transform 1s ease-in-out";
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex, isTransitioning]);

  // const slides = [...Aimages];
  // slides.unshift(Aimages[Aimages.length - 1]);
  // slides.push(Aimages[0]);

  // const onPickIndex = useCallback((index: React.Key): void => {
  //   if (currentIndex === index) {

  //     return;
  //   }
  //   setCurrentIndex(index);
  // }, [currentIndex]);
  
  // useEffect(() => {
  //   setCurrentIndex(Aimages.map((image: string, index: React.Key ) => {
  //     return (
  //       <Picker
  //         onClick={() => onPickIndex(index)}
  //         background={currentIndex === index ? 'orange' : 'white'}
  //       >
  //       </Picker>
  //     );
  //   }));
  // }, [onPickIndex, currentIndex]);

  return (
    <div className={styles.slider}>
      <div
        className={styles.slider_images}
        ref={sliderRef}
        onTransitionEnd={handleTransitionEnd}
      >
        
        <div className={styles.slide}>
          <img src={Aimages[Aimages.length - 1]} alt={`Slide ${Aimages.length - 1}`} />
        </div>

        {Aimages.map((image: string | undefined, index: React.Key | null | undefined) => (
          <div key={index} className={styles.slide}>
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}

        <div className={styles.slide}>
          <img src={Aimages[0]} alt="Slide 0" />
        </div>

        {/* {slides.map(
          (image: string | undefined, index: React.Key | null | undefined) => (
            <div key={index} className={styles.slide}>
              <img src={image} alt={`Slide ${index}`} />
            </div>
          )
        )} */}

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
