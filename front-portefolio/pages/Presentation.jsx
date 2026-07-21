import Cartes from "../composants/Cartes";
import styles from "../styles/Presentation.module.css";

export default function Presentation() {
  const cards = [
    {
      front: (
        <img
          src="/images/jen1.png"
          alt="L'origine"
          className={styles.imgFront}
        />
      ),
      back: (
        <div className={styles.titre}>
          <h1>Les Origines</h1>
          <p>
            Je vous invite à travers ce site à découvrir toutes les facettes de
            ma personnalité. De nature pudique, créer à travers un écran est
            très libérateur. Vous verrez que ce site sert à la fois d’exutoire,
            de moyen d’expression mais plus professionnellement parlant de récit
            qui restitue mon parcours.
          </p>

          <p>
            Depuis petite j’ai toujours été dans la lune ou plutôt dans un
            univers fait de toute pièce par mes soins. Mon imagination
            nourrissait mes dessins, mes poèmes, des chansons, des tenues… Tout
            cela me représentait sans pour autant que quiconque arrive à me
            connaitre assez.
          </p>

          <p>
            Comme dans l’espace, il y a des choses en moi qui reste et resterons
            encore un mystère dont je n’ai que seule le secret. En grandissant
            dans ce monde, il m’a quand même fallu garder les pied sur terre
            notamment à cause de la présence des écrans de plus en plus
            inévitable.
          </p>
        </div>
      ),
      bg: "bg1",
    },

    {
      front: (
        <img
          src="/images/jen2.png"
          alt="La transformation"
          className={styles.imgFront}
        />
      ),
      back: (
        <div className={styles.titre}>
          <h1>L'inspiration</h1>
          <p>
            Avec des nouveaux écrins de technologie de nouveau horizons se
            présageaient : les films, l’actualité, les tendances derrière ses
            pixels devenaient un outil à mon inspiration, une fenêtre sur le
            monde mais surtout un arrosoir pour mon jardin secret qui
            s’animaient, démultipliaient son champs de possibilité.
          </p>

          <p>
            Et qui plus est j’habitais près de Paris, capital de l’amour,
            capital de la mode, capitale de l’art, capital d’un patrimoine et
            d’une histoire riches et inépuisable. Adolescente, nous faisions les
            fripes avec autour de mon cou la sangle d’un Reflex Canon. Je me
            souviens encore de mes jeans cheap Monday et surtout de mon tous
            premier ordinateur, mon très vieux et fidèle serviteur : Mon Mac pro
            Uni body.
          </p>

          <p>
            J’ai commencé à m’initier à la retouche photo, à la création de
            Powerpoint, à des montages vidéo… il m’a fallu bien plus tard et
            bien des péripéties pour en arriver au plus gros ce que j’aime et ce
            que je sais faire aujourd’hui.
          </p>

          <p>
            Oui, la maladie est passée par là, s’en trop m’y pencher j’ai dû
            mettre en stand bye toutes mes ambitions pendant quelques années
            pour retrouver une bonne santé. Cette période m’a laissé beaucoup de
            temps de réflexion, d’introspection et de révélation sur ce que je
            voulais faire de ma vie.
          </p>

          <p>
            Je veux créer encore et encore de toutes les manière possible sans
            aucune autre contre mesure laisser une trace sans doute infime de
            mon passage sur cette petite planète ou je vis.
          </p>
        </div>
      ),
      bg: "bg2",
    },

    {
      front: (
        <img
          src="/images/jen3.png"
          alt="Les Ambitions"
          className={styles.imgFront}
        />
      ),
      back: (
        <div>
          <h1 className={styles.titre}>La quête</h1>
          <p>
            Ma contribution est de faire qu’aujourd’hui soit plus précieux,
            poétique, artistique, unique, afin que demain tous les projets
            réalisés puissent faire avancer, inspirer et inculquer un meilleur
            mode de vie et ceux avec l’art et la manière et à des fins
            honorables.
          </p>

          <p>
            Pour parler sans détour, je veux avec mes capacités en
            programmation, mes idées en fusion faire prendre vie des application
            à la fois futuristes, simplistes, ergonomique, et conçu comme « à la
            main » : de la haute couture technologique.
          </p>

          <p>
            En utilisant de la 3D, optimisant l’expérience utilisateur, en les
            responsabilisant dans nos fonctionnalités à des habitudes plus
            saines et écologique, en innovant pour rentabiliser et diminuer
            notre temps d’écran mais surtout donné ce sentiment de valeur
            ajoutée, de pièce rare, de sur mesure à l’interface proposée.
          </p>

          <p>
            Je souhaite participer à une utilisation des écrans ingénieuse,
            minimaliste mais surtout unique à chacun. Je suis en pleine
            réalisation de ce porte folio afin de montrer l’étendu de mon
            savoir-faire et surtout mettre en pratique mes connaissances. Je
            veux que mon regards personnel sur la conception puisse changer les
            habitudes et donner de la valeur à notre temps (d’écrans) au lieu de
            la perdre bêtement.
          </p>
        </div>
      ),
      bg: "bg3",
    },
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.h1}>Quelques mots de votre Dev cosmic Girl ✨</h1>
        <h2 className={styles.h2}>
          Cliquez sur les différentes cartes de mon avatar, vous en saurez plus
          !
        </h2>
        <section className={styles.cardsGrid}>
          {cards.map((card, index) => (
            <Cartes
              key={index}
              front={card.front}
              back={card.back}
              bg={card.bg}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
