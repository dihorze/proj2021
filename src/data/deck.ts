export const CardTypes = {
  NONE: "NONE",
  ATTACK: "ATTACK",
  NON_ATTACK: "NON_ATTACK",
};

interface PrototypeCard {
  id: string;
  title: string;
  type: string;
  level: string;
  uri?: string;
  discription?: string;
  cost: number;
  isPlayable: boolean;
  isShred: boolean;
}

export const deckUndergrad: { [id: string]: PrototypeCard } = {
  explain: {
    id: "explain",
    title: "Explain",
    type: CardTypes.ATTACK,
    level: "0",
    uri: "./assets/Explain.png",
    discription: "Resolve 8 confunsion",
    cost: 1,
    isPlayable: true,
    isShred: false
  },
  calm: {
    id: "calm",
    title: "Calm",
    type: CardTypes.NON_ATTACK,
    level: "0",
    uri: "./assets/Calm.png",
    discription: "Add 8 composure",
    cost: 1,
    isPlayable: true,
    isShred: false
  },
  smile_and_nod: {
    id: "smile_and_nod",
    title: "Smile and Nod",
    type: CardTypes.NON_ATTACK,
    level: "0",
    uri: "./assets/Smile_and_nod.png",
    discription: "Add 6 composure, draw 1 card",
    cost: 1,
    isPlayable: true,
    isShred: false
  },
  quick_reference: {
    id: "quick_reference",
    title: "Quick Reference",
    type: CardTypes.ATTACK,
    level: "0",
    uri: "./assets/Quick_reference.png",
    discription: "Resolve 5 confusion, gain 2 clarity",
    cost: 1,
    isPlayable: true,
    isShred: false
  },
};

export const deckMaster = { ...deckUndergrad };

export const getCardType = (key: string) => {
  const id = key.split("-")[0];

  return (
    deckMaster[id]?.type ||
    (parseInt(key) % 2 ? CardTypes.ATTACK : CardTypes.NON_ATTACK)
  ); // testing purpose
};

const cardIds = Object.keys(deckMaster);

export const getRandomCard = () => {
  const idx = Math.floor(Math.random() * cardIds.length);
  return cardIds[idx];
}
