import { useEffect, useState, useRef } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styles from "../styles/PopupEntree.module.css";
import HorizontalDatePicker from "../composants/DatePicker/HorizontalDatePicker";

// URL de l'API sortie dans une variable d'environnement (fallback en local)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

export default function PopupEntree({ onMusicSelected }) {
  const [dateNaissance, setDateNaissance] = useState(null);
  const [signeAstro, setSigneAstro] = useState("");
  const [open, setOpen] = useState(false);
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const didRun = useRef(false);

  const handleDateChange = ({ dateNaissance, signeAstro }) => {
    setDateNaissance(dateNaissance);
    setSigneAstro(signeAstro);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!localStorage.getItem("sessionId")) {
      localStorage.setItem("sessionId", crypto.randomUUID());
    }
  }, []);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem("popupSeenSession");
    if (!seen) setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("popupSeenSession", "true");
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // évite le double-clic pendant une soumission en cours

    if (!dateNaissance) {
      alert("Choisis ta date de naissance 🙂");
      return;
    }

    if (!mood) {
      alert("Choisis ton mood 🙂");
      return;
    }

    const query = `${artist} ${title}`.trim();
    if (!query) {
      alert("Renseigne l'artiste et/ou le titre de ta chanson 🙂");
      return;
    }

    setIsSubmitting(true);

    try {
      const url = `${API_URL}/api/youtube/search?q=${encodeURIComponent(
        query,
      )}&maxResults=1`;
      const res = await fetch(url);

      const text = await res.text();
      console.log("YT search status:", res.status);
      console.log("YT search raw body:", text);

      let data = null;
      try {
        data = JSON.parse(text);
      } catch (e) {
        alert("Réponse serveur invalide (pas du JSON). Regarde la console.");
        return;
      }

      if (!res.ok) {
        alert(data?.error || `Erreur API (${res.status})`);
        return;
      }

      const videoId = data?.items?.[0]?.videoId;

      if (!videoId) {
        alert("Aucune musique trouvée (0 résultat). Regarde la console.");
        return;
      }

      const sessionId = localStorage.getItem("sessionId");

      // ✅ ENREGISTREMENT MONGO
      const saveRes = await fetch(`${API_URL}/api/popup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood,
          artist,
          title,
          videoId,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          sessionId,
          dateNaissance,
          signeAstro,
        }),
      });

      if (!saveRes.ok) {
        const errText = await saveRes.text();
        console.error("SAVE POPUP ERROR:", saveRes.status, errText);
        alert("Erreur d'enregistrement Mongo. Regarde la console.");
        return;
      }

      onMusicSelected(videoId);
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Erreur réseau : back indisponible ou CORS.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Popup
      open={open}
      closeOnDocumentClick={false}
      onClose={handleClose}
      contentStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        width: "300px",
        heigth: "150px",
        padding: 0,
        transform: "translateX(5px)",
      }}
      className={styles.main}
    >
      <div className={styles.container}>
        <img
          src="/images/regard.jpeg"
          alt="Image d'accueil"
          className={styles.imageTop}
        />

        <div className={styles.body}>
          <h1>FAISONS DE TA VISITE UNE EXPERIENCE UNIQUE !!</h1>
          {/* <label className={styles.label}></label> */}
          <HorizontalDatePicker
            minYear={1930}
            maxYear={2020}
            onChange={handleDateChange}
          />
          <label className={styles.label}>
            Dans quel mood es-tu, aujourd’hui ?
          </label>
          <div className={styles.moodOptions}>
            {["soucieux", "énervé", "enthousiaste", "rêveur", "curieux"].map(
              (m) => (
                <label key={m}>
                  <input
                    type="radio"
                    name="mood"
                    value={m}
                    checked={mood === m}
                    onChange={(e) => setMood(e.target.value)}
                  />{" "}
                  {m}
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

          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Chargement..."
            ) : (
              <>
                Continuer <br />
                (Mets le son 🎵)
              </>
            )}
          </button>
        </div>
      </div>
    </Popup>
  );
}
