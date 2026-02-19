import { useRef } from "react";
import YouTube from "react-youtube";

export default function MusicPlayer({ videoId }) {
  const playerRef = useRef(null);

  if (!videoId) return null;

  return (
    <div style={{ position: "fixed", bottom: 10, right: 10, width: 300 }}>
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
  );
}
