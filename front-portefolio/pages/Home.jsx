import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Menu from "../composants/Menu";
import Image from "next/image";
import PopupEntree from "../composants/PopupEntree";
import MusicPlayer from "../composants/MusicPlayer";

export default function Home() {
  const router = useRouter();
  const [videoId, setVideoId] = useState(null);

  return (
    <div>
      <PopupEntree onMusicSelected={setVideoId} />
      <MusicPlayer videoId={videoId} />
      {/* Vidéo réellement en arrière-plan */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/images/galaxie.mp4" type="video/mp4" />
      </video>

      <main className={styles.main}>
        <section className={styles.section}>
          {/* Mets un / devant le chemin et idéalement Next/Image */}
          <Image
            src="/images/jen.png"
            width={220} // choisis une taille
            height={220}
            alt="Jen Andria"
            className={styles.jen}
          />
          <h2 className={styles.h2}>
            Bienvenue dans l'univers d'une passionnée de dev.
          </h2>
        </section>
        <video>
          <source />
        </video>

        <div className={styles.images}>
          <Menu />
        </div>
      </main>
    </div>
  );
}
