import { useState, useCallback } from "react";
import styles from "../styles/Cartes.module.css";

export default function Cartes({ front, back, bg, className }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = useCallback(() => setFlipped((f) => !f), []);

  return (
    <div className={styles.cardWrap}>
      <div
        className={`${styles.card} ${flipped ? styles.isFlipped : ""}`}
        onClick={toggle}
      >
        {/* Face avant */}
        <div
          className={`${styles.face} ${styles.front} ${bg ? styles[bg] : ""}`}
        >
          {typeof front === "string" ? (
            <span className={styles.title}>{front}</span>
          ) : (
            front
          )}
        </div>

        {/* Face arrière */}
        <div className={`${styles.face} ${styles.back}`}>
          {typeof back === "string" ? (
            <p className={styles.text}>{back}</p>
          ) : (
            back
          )}
        </div>
      </div>
    </div>
  );
}
