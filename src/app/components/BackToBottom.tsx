import React, { useState, useEffect } from "react";
import styles from "@/app/styles/ScrollTo.module.css";

const BackToBottom: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true); // Ensure it starts as visible

  const makeVisible = () => {
    if (
      window.pageYOffset <
      document.documentElement.scrollHeight - window.innerHeight - 300
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
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
    <div className={styles.backToBottom} onClick={scrollToBottom}>
      {isVisible && (
        <div className={styles.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2l8.5 10h-5v10h-7v-10h-5z"
              transform="rotate(180 12 12)"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default BackToBottom;
