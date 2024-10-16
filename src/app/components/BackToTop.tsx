import React, { useState, useEffect } from "react";
import styles from "@/app/styles/ScrollTo.module.css";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const makeVisible = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", makeVisible);
    return () => {
      window.removeEventListener("scroll", makeVisible);
    };
  }, []);

  return (
    <div className={styles.backToTop} onClick={scrollToTop}>
      {isVisible && (
        <div className={styles.icon}>
          {/* Replace with any icon you like, here's an SVG arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M12 2l8.5 10h-5v10h-7v-10h-5z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default BackToTop;
