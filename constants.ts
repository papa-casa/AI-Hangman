import { WordData, Language } from './types';

export const MAX_LIVES = 6;

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const TRANSLATIONS = {
  IT: {
    title: "L'Impiccato AI",
    startClassic: "Classica",
    startAI: "Sfida AI",
    classicDesc: "Parole Casuali",
    aiDesc: "Scegli Argomento",
    inputPlaceholder: "Argomento (es. Scienza, Storia...)",
    cancel: "Annulla",
    start: "Gioca",
    loading: "Generazione...",
    lives: "Palloncini",
    hint: "Indizio",
    hintLocked: "Bloccato",
    unlockHint: "Sblocca",
    winTitle: "Vittoria!",
    loseTitle: "Sconfitta",
    wordWas: "La parola era",
    playAgain: "Rigioca",
    abort: "Esci",
    footer: "Powered by Samuele Marotta"
  },
  EN: {
    title: "AI Hangman",
    startClassic: "Classic",
    startAI: "AI Challenge",
    classicDesc: "Random Words",
    aiDesc: "Custom Topic",
    inputPlaceholder: "Topic (e.g. Science, History...)",
    cancel: "Cancel",
    start: "Play",
    loading: "Generating...",
    lives: "Balloons",
    hint: "Hint",
    hintLocked: "Locked",
    unlockHint: "Unlock",
    winTitle: "Victory!",
    loseTitle: "Game Over",
    wordWas: "The word was",
    playAgain: "Play Again",
    abort: "Exit",
    footer: "Powered by Samuele Marotta"
  },
  FR: {
    title: "Le Pendu IA",
    startClassic: "Classique",
    startAI: "Défi IA",
    classicDesc: "Mots Aléatoires",
    aiDesc: "Sujet Personnalisé",
    inputPlaceholder: "Sujet (ex. Science, Histoire...)",
    cancel: "Annuler",
    start: "Jouer",
    loading: "Génération...",
    lives: "Ballons",
    hint: "Indice",
    hintLocked: "Verrouillé",
    unlockHint: "Révéler",
    winTitle: "Victoire!",
    loseTitle: "Défaite",
    wordWas: "Le mot était",
    playAgain: "Rejouer",
    abort: "Quitter",
    footer: "Propulsé par Samuele Marotta"
  },
  ES: {
    title: "El Ahorcado IA",
    startClassic: "Clásico",
    startAI: "Desafío IA",
    classicDesc: "Palabras Aleatorias",
    aiDesc: "Tema Personalizado",
    inputPlaceholder: "Tema (ej. Ciencia, Historia...)",
    cancel: "Cancelar",
    start: "Jugar",
    loading: "Generando...",
    lives: "Globos",
    hint: "Pista",
    hintLocked: "Bloqueado",
    unlockHint: "Desbloquear",
    winTitle: "¡Victoria!",
    loseTitle: "Derrota",
    wordWas: "La palabra era",
    playAgain: "Jugar de Nuevo",
    abort: "Salir",
    footer: "Impulsado por Samuele Marotta"
  },
  DE: {
    title: "KI Galgenmännchen",
    startClassic: "Klassisch",
    startAI: "KI Herausforderung",
    classicDesc: "Zufallswörter",
    aiDesc: "Benutzerdefiniertes Thema",
    inputPlaceholder: "Thema (z.B. Wissenschaft, Geschichte...)",
    cancel: "Abbrechen",
    start: "Spielen",
    loading: "Generiere...",
    lives: "Ballons",
    hint: "Hinweis",
    hintLocked: "Gesperrt",
    unlockHint: "Freischalten",
    winTitle: "Sieg!",
    loseTitle: "Niederlage",
    wordWas: "Das Wort war",
    playAgain: "Nochmal spielen",
    abort: "Beenden",
    footer: "Bereitgestellt von Samuele Marotta"
  }
};

export const CLASSIC_WORDS: Record<Language, WordData[]> = {
  IT: [
    { word: "ARCHITETTURA", hint: "Arte e tecnica di progettare edifici." },
    { word: "MACCHINA", hint: "Veicolo a motore." },
    { word: "ELEFANTE", hint: "Grande mammifero con la proboscide." },
    { word: "CUCCHIAIO", hint: "Posata per mangiare zuppe." },
    { word: "OROLOGIO", hint: "Misura il tempo." },
    { word: "MONTAGNA", hint: "Rilievo terrestre elevato." }
  ],
  EN: [
    { word: "ARCHITECTURE", hint: "The art of designing buildings." },
    { word: "VEHICLE", hint: "A machine used for transporting people." },
    { word: "ELEPHANT", hint: "A large mammal with a trunk." },
    { word: "SPOON", hint: "Utensil for eating soup." },
    { word: "CLOCK", hint: "It tells time." },
    { word: "MOUNTAIN", hint: "A large natural elevation of the earth." }
  ],
  FR: [
    { word: "ARCHITECTURE", hint: "L'art de concevoir des bâtiments." },
    { word: "VOITURE", hint: "Véhicule à moteur." },
    { word: "ELEPHANT", hint: "Grand mammifère avec une trompe." },
    { word: "CUILLERE", hint: "Ustensile pour manger de la soupe." },
    { word: "HORLOGE", hint: "Elle indique l'heure." },
    { word: "MONTAGNE", hint: "Grande élévation naturelle." }
  ],
  ES: [
    { word: "ARQUITECTURA", hint: "Arte de proyectar edificios." },
    { word: "COCHE", hint: "Vehículo de motor." },
    { word: "ELEFANTE", hint: "Gran mamífero con trompa." },
    { word: "CUCHARA", hint: "Utensilio para comer sopa." },
    { word: "RELOJ", hint: "Mide el tiempo." },
    { word: "MONTAÑA", hint: "Gran elevación natural." }
  ],
  DE: [
    { word: "ARCHITEKTUR", hint: "Die Kunst, Gebäude zu entwerfen." },
    { word: "AUTO", hint: "Kraftfahrzeug." },
    { word: "ELEFANT", hint: "Großes Säugetier mit Rüssel." },
    { word: "LOEFFEL", hint: "Besteck zum Suppe essen." },
    { word: "UHR", hint: "Zeigt die Zeit an." },
    { word: "BERG", hint: "Große natürliche Erhebung." }
  ]
};