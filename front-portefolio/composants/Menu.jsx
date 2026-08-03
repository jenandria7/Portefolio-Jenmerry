import Image from "next/image";
import styles from "../styles/Menu.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Menu() {
  const images = {
    Présentation: {
      subtitle: "Un mot de Jen",
      href: "/Presentation",
      img: "/images/planets/Terre.png",
    },
    "Mon parcours": {
      subtitle: "Petite rétrospective",
      href: "/Mon_parcours",
      img: "/images/planets/Mercure.png",
    },
    "Mes passions": {
      subtitle: "De l'art à la philosophie",
      href: "/Mes_passions",
      img: "/images/planets/Venus.png",
    },
    "Mes projets pro": {
      subtitle: "Futur & Passé",
      href: "/Mes_projets",
      img: "/images/planets/Mars.png",
    },
    "Question-Réponse": {
      subtitle: "Jen vous dit tout",
      href: "/Question_reponse",
      img: "/images/planets/Jupiter.png",
    },
    "Mon CV Vidéo": {
      subtitle: "Témoignage personnel",
      href: "/Mon_CV",
      img: "/images/planets/Uranus.png",
    },
    "Me contacter": {
      subtitle: "Envie d'une collaboration?",
      href: "/Me_contacter",
      img: "/images/planets/Neptune.png",
    },
  };
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={styles.container}
      className={`${styles.container} ${visible ? styles.show : styles.hide}`}
    >
      {Object.entries(images).map(([title, data], index) => (
        <Link key={index} href={data.href} className={styles.imageWrap}>
          <Image
            src={data.img}
            alt={title}
            width={70}
            height={70}
            className={styles.image}
          />
          <div className={styles.overlay}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.subtitle}>{data.subtitle}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
