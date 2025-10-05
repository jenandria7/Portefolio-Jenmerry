import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Menu from "../composants/Menu";
import Image from "next/image";


export default function Home() {
  // const items = [
  //   {
  //     title: "Présentation",
  //     subtitle: "Un mot de Jen",
  //     href: "/presentation",
  //     img: "/images/planets/Terre.png",
  //   },
  //   {
  //     title: "Mon parcours",
  //     subtitle: "Petite rétrospective",
  //     href: "/mon-parcours",
  //     img: "/images/planets/Mercure.png",
  //   },
  //   {
  //     title: "Mes passions",
  //     subtitle: "De l'art à la philosophie",
  //     href: "/mes-passions",
  //     img: "/images/planets/Venus.png",
  //   },
  // ];

  const router = useRouter();

  return (
    <div>
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
            width={220}     // choisis une taille
            height={220}
            alt="Jen Andria"
            className={styles.jen}
          />
          <h2 className={styles.h2}>
            Bienvenue dans l'univers d'une passionnée de dev.
          </h2>
        </section>

        <div style={{ background: "transparent", minHeight: "60vh" }}>
          <Menu />
        </div>
      </main>
    </div>
  );
}
