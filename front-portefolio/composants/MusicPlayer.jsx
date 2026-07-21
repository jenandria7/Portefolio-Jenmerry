import { useRef, useState } from "react";
import YouTube from "react-youtube";
import styles from "../styles/MusicPlayer.module.css";

export default function MusicPlayer({ videoId }) {
  const playerRef = useRef(null);
  const [minimized, setMinimized] = useState(false);

  if (!videoId) return null;

  if (minimized) {
    return (
      <div
        className={`${styles.container} ${styles.minimized}`}
        onClick={() => setMinimized(false)}
        title="Agrandir le lecteur"
      >
        <span className={styles.minimizedIcon}>🎵</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.toggleBtn}
        onClick={() => setMinimized(true)}
        title="Minimiser le lecteur"
      >
        −
      </button>
      <div className={styles.player}>
        <YouTube
          videoId={videoId}
          onReady={(e) => {
            playerRef.current = e.target;
            e.target.playVideo(); // autorisé car déclenché par clic popup
          }}
          opts={{
            width: "300",
            height: "170",
            playerVars: {
              autoplay: 1,
              controls: 1,
              rel: 0,
              playsinline: 1,
            },
          }}
        />
      </div>
    </div>
  );
}
