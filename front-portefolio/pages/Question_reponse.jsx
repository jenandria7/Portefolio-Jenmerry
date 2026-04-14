import styles from "../styles/Question_reponse.module.css";

export default function Question_réponse() {
  return (
    <div>
      <header>
        <h1 className={styles.h1}> Faisons connaissance </h1>
        <h2>N'attendez pas! </h2>
        <h3>
          Posez moi vos questions ! Mes réponses seront poster et vous en saurez
          plus sur mon travail et mon profil pro
        </h3>
      </header>
      <main>
        <input
          type="text"
          placeholder="posez votre question"
          className={styles.input}
        ></input>
        <summary className={styles.question}>
          Pourquoi vous êtes vous reconvertie dans la tech?
        </summary>
        <p></p>
        <summary> Quel technologie maitrises tu ? </summary>
        <p className={styles.reponse}>Réponse</p>
        <summary className={styles.question}>
          Quelle est la particularité de ton profil?
        </summary>
        <p> Réponse</p>
        <summary className={styles.question}>
          Qu'est ce qu'un "bon projet" pour toi ?
        </summary>
        <p className={styles.reponse}>Réponse</p>
        <summary className={styles.question}>
          Quelles est la plus grosse difficulté technique que tu as rencontrée?
        </summary>
        <p className={styles.reponse}>Réponse</p>
        <summary className={styles.question}>
          Qu'est ce qui te différencie des autres développeurs?
        </summary>
        <p className={styles.reponse}>Réponse</p>
        <summary className={styles.question}>
          Si ton code était une qualité humaine, laquelle serait-elles?
        </summary>
        <p className={styles.reponse}>Réponse</p>
      </main>
      <summary className={styles.question}>
        A quoi reconnais tu un bon developpeur ?
      </summary>
      <p className={styles.reponse}>Réponse</p>
      <summary>A quoi aspire tu dans le futur professionnellement? </summary>
      <p className={styles.reponse}>Réponse</p>
      <summary> Es-tu plus logique ou créative? </summary>
      <p className={styles.reponse}>Réponse</p>
    </div>
  );
}
