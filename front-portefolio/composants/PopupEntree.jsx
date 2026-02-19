import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styles from "../styles/PopupEntree.module.css";

export default function PopupEntree({ onMusicSelected }) {
  const [open, setOpen] = useState(false);
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleSubmit = async () => {
    const query = `${artist} ${title}`.trim();
    if (!query) return;

    try {
      const url = `http://localhost:3001/api/youtube/search?q=${encodeURIComponent(query)}&maxResults=1`;
      const res = await fetch(url);

      // On lit d'abord en texte pour pouvoir logger même si ce n'est pas du JSON
      const text = await res.text();
      console.log("YT search status:", res.status);
      console.log("YT search raw body:", text);

      let data = null;
      try {
        data = JSON.parse(text);
      } catch (e) {
        // réponse non-JSON => on arrête avec un message clair
        alert("Réponse serveur invalide (pas du JSON). Regarde la console.");
        return;
      }

      if (!res.ok) {
        alert(data?.error || `Erreur API (${res.status})`);
        return;
      }

      const videoId = data?.items?.[0]?.videoId;

      if (videoId) {
        onMusicSelected(videoId);
        setOpen(false);
      } else {
        alert("Aucune musique trouvée (0 résultat). Regarde la console.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau : back indisponible ou CORS.");
    }
  };

  return (
    <Popup
      open={open}
      closeOnDocumentClick={false}
      contentStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        width: "390px",
        height: "520px",
      }}
    >
      <div className={styles.container}>
        <img
          src="/images/regard.jpeg"
          alt="Image d'accueil"
          className={styles.imageTop}
        />

        <div className={styles.body}>
          <label className={styles.label}>
            Dans quel mood es-tu, aujourd’hui ?
          </label>

          <div className={styles.moodOptions}>
            {["soucieux", "énervé", "enthousiaste", "rêveur", "curieux"].map(
              (m) => (
                <label key={m}>
                  <input type="radio" name="mood" value={m} /> {m}
                </label>
              ),
            )}
          </div>

          <label className={styles.label}>Ta chanson du moment ?</label>

          <input
            type="text"
            placeholder="Artiste"
            className={styles.input}
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />

          <input
            type="text"
            placeholder="Titre"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button className={styles.button} onClick={handleSubmit}>
            Continuer <br />
            (Mets le son 🎵)
          </button>
        </div>
      </div>
    </Popup>
  );
}
