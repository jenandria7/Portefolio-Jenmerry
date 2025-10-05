import Image from "next/image";
import styles from "../styles/Menu.module.css";

export default function Menu() {
    const images = {
        "Présentation": {
            subtitle: "Un mot de Jen",
            href: "/Présentation",
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
        "Questions-Réponses": {
            subtitle: "Jen vous dit tout",
            href: "/Mon_profil",
            img: "/images/planets/Jupiter.png",
        },
        "Mon CV Vidéo": {
            subtitle: "Témoignage personnel",
            href: "/Mon_CV",
            img: "/images/planets/Uranus.png",
        },
        "Me contacter": {
            subtitle: "Réalisation de projets & Opportunités",
            href: "/Me_contacter",
            img: "/images/planets/Neptune.png",
        },
    };

    return (
        <section className={styles.container}>
            {Object.entries(images).map(([title, data], index) => (
                <div key={index} className={styles.imageWrap}>
                    <Image
                        src={data.img}
                        alt={title}
                        width={90}
                        height={90}
                        className={styles.image}
                    />
                    <div className={styles.overlay}>
                        <h3 className={styles.title}>{title}</h3>
                        <p className={styles.subtitle}>{data.subtitle}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}
