import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import styles from "./HorizontalDatePicker.module.css";

const ZODIAC_SIGNS = [
  { name: "Capricorne", start: [12, 22], end: [1, 19] },
  { name: "Verseau", start: [1, 20], end: [2, 18] },
  { name: "Poissons", start: [2, 19], end: [3, 20] },
  { name: "Bélier", start: [3, 21], end: [4, 19] },
  { name: "Taureau", start: [4, 20], end: [5, 20] },
  { name: "Gémeaux", start: [5, 21], end: [6, 20] },
  { name: "Cancer", start: [6, 21], end: [7, 22] },
  { name: "Lion", start: [7, 23], end: [8, 22] },
  { name: "Vierge", start: [8, 23], end: [9, 22] },
  { name: "Balance", start: [9, 23], end: [10, 22] },
  { name: "Scorpion", start: [10, 23], end: [11, 21] },
  { name: "Sagittaire", start: [11, 22], end: [12, 21] },
];

const getZodiacSign = (date) => {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  for (const sign of ZODIAC_SIGNS) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;

    if (startMonth === endMonth) {
      if (month === startMonth && day >= startDay && day <= endDay) {
        return sign.name;
      }
    } else {
      // signe à cheval sur deux mois (ex: Capricorne déc-jan)
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay)
      ) {
        return sign.name;
      }
    }
  }
  return "";
};

const getAge = (birthDate) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

// Remplace l'import lucide-react par ces deux petits composants

const ChevronLeft = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// --- Utilitaires (même logique que dans Calendar.jsx) ---
const CALENDAR_MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const WEEKDAYS_SHORT = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

const zeroPad = (value, length) => `${value}`.padStart(length, "0");

const getMonthDays = (month, year) => {
  const months30 = [3, 5, 8, 10]; // avril, juin, sept, nov (index 0-based)
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  if (month === 1) return leapYear ? 29 : 28;
  return months30.includes(month) ? 30 : 31;
};

const isSameDay = (a, b) => {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const formatDateFr = (date) => {
  return `${date.getDate()} ${
    CALENDAR_MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;
};
// --- Composant ---
export default function HorizontalDatePicker({
  minYear = 1930,
  maxYear = 2020,
  onChange,
}) {
  const today = useMemo(() => new Date(), []);
  const scrollRef = useRef(null);
  const dayRefs = useRef({});

  const [selected, setSelected] = useState(null);
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const years = useMemo(() => {
    const list = [];
    for (let y = maxYear; y >= minYear; y--) list.push(y);
    return list;
  }, [minYear, maxYear]);

  const days = useMemo(() => {
    const total = getMonthDays(viewMonth, viewYear);
    return Array.from(
      { length: total },
      (_, i) => new Date(viewYear, viewMonth, i + 1),
    );
  }, [viewMonth, viewYear]);

  // Recentre le scroll quand on change de mois/année
  useEffect(() => {
    if (!selected) return;
    const target =
      dayRefs.current[selected.getDate()] &&
      selected.getMonth() === viewMonth &&
      selected.getFullYear() === viewYear
        ? dayRefs.current[selected.getDate()]
        : dayRefs.current[1];
    target?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [viewMonth, viewYear]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectDay = useCallback(
    (day) => {
      setSelected(day);

      onChange?.({
        dateNaissance: day,
        signeAstro: getZodiacSign(day),
      });
    },
    [onChange],
  );

  const goToday = () => {
    setViewMonth(today.getMonth());
    setViewYear(today.getFullYear());
    selectDay(today);
  };

  const changeMonth = (delta) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  };

  // Navigation clavier entre les jours (roving tabindex)
  const handleKeyDown = (e, day) => {
    const idx = day.getDate();
    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (idx < days.length) dayRefs.current[idx + 1]?.focus();
      else changeMonth(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (idx > 1) dayRefs.current[idx - 1]?.focus();
      else changeMonth(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      dayRefs.current[1]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      dayRefs.current[days.length]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectDay(day);
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.selectedLabel}>
        {selected ? (
          <>
            Je suis né(e) le {formatDateFr(selected)}.
            <br />
            J'ai {getAge(selected)} ans et je suis du signe{" "}
            {getZodiacSign(selected)}.
          </>
        ) : (
          "Sélectionne ta date de naissance ..."
        )}
      </p>
      {/* --- Annonce vocale du mois affiché (lecteurs d'écran) --- */}
      <p aria-live="polite" className={styles.srOnly}>
        {CALENDAR_MONTHS[viewMonth]} {viewYear}
      </p>

      {/* --- Sélecteurs mois / année accessibles --- */}
      <div className={styles.header}>
        <label className={styles.srOnly} htmlFor="month-select">
          Mois
        </label>
        <select
          id="month-select"
          value={viewMonth}
          onChange={(e) => setViewMonth(Number(e.target.value))}
          className={`${styles.select} ${styles.selectMonth}`}
        >
          {CALENDAR_MONTHS.map((m, i) => (
            <option key={m} value={i}>
              {m}
            </option>
          ))}
        </select>

        <label className={styles.srOnly} htmlFor="year-select">
          Année
        </label>
        <select
          id="year-select"
          value={viewYear}
          onChange={(e) => setViewYear(Number(e.target.value))}
          className={styles.select}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      {/* --- Liste horizontale des jours --- */}
      <div
        ref={scrollRef}
        role="listbox"
        aria-label={`Jours de ${CALENDAR_MONTHS[viewMonth]} ${viewYear}`}
        className={styles.daysScroller}
      >
        {days.map((day) => {
          const active = isSameDay(day, selected);
          const isToday = isSameDay(day, today);
          const dayNum = day.getDate();

          return (
            <button
              key={dayNum}
              ref={(el) => (dayRefs.current[dayNum] = el)}
              role="option"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              onClick={() => selectDay(day)}
              onKeyDown={(e) => handleKeyDown(e, day)}
              className={`${styles.dayButton} ${active ? styles.dayButtonActive : ""}`}
            >
              {/* <span className={styles.dayWeekday}>
                {WEEKDAYS_SHORT[day.getDay()]}
              </span> */}
              <span className={styles.dayNumber}>{zeroPad(dayNum, 2)}</span>
              {isToday && !active && <span className={styles.todayDot} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
