import { Card } from "../model/classes";

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
  // starting
  explain: {
    id: "explain",
    title: "Explain",
    type: CardTypes.ATTACK,
    level: "0",
    uri: "./assets/Explain.png",
    discription: "Resolve 8 confunsion",
    cost: 1,
    isPlayable: true,
    isShred: false,
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
    isShred: false,
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
    isShred: false,
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
    isShred: false,
  },
  // level 1000
  innocence: {
    id: "innocence",
    title: "Innocence",
    type: CardTypes.NON_ATTACK,
    level: "1",
    uri: "./assets/Innocence.png",
    discription: "Add 13 composure, add 10 confusion for all opponents",
    cost: 1,
    isPlayable: true,
    isShred: false,
  },
  wait_for_it: {
    id: "wait_for_it",
    title: "Wait For It",
    type: CardTypes.NON_ATTACK,
    level: "1",
    uri: "./assets/Wait_for_it.png",
    discription: "The damage dealt this turn is transferred to the next turn, start a new turn, shred",
    cost: 1,
    isPlayable: true,
    isShred: true
  },
  pardon: {
    id: "pardon",
    title: "Pardon",
    type: CardTypes.NON_ATTACK,
    level: "1",
    uri: "./assets/Pardon.png",
    discription: "The same move will be performed by your opponent in the next turn, shred",
    cost: 1,
    isPlayable: true,
    isShred: true
  },
  pep_talk: {
    id: "pep_talk",
    title: "Pep Talk",
    type: CardTypes.NON_ATTACK,
    level: "1",
    uri: "./assets/Pep_talk.png",
    discription:
      "Resolve 25 confusion to people who like your research, shred",
    cost: 1,
    isPlayable: true,
    isShred: true,
  },
  barrage: {
    id: "barrage",
    title: "Barrage",
    type: CardTypes.ATTACK,
    level: "1",
    uri: "./assets/Barrage.png",
    discription: "Resolve 6 confusion X times",
    cost: -1,
    isPlayable: true,
    isShred: false,
  },
  vehement: {
    id: "vehement",
    title: "Vehement",
    type: CardTypes.NON_ATTACK,
    level: "1",
    uri: "./assets/Vehement.png",
    discription:
      "If your motivation is the highest status, resolve 15 confusion and apply 2 impressionable to all opponent",
    cost: 2,
    isPlayable: true,
    isShred: false,
  },
  adamant: {
    id: "adamant",
    title: "Adamant",
    type: CardTypes.NON_ATTACK,
    level: "1",
    uri: "./assets/Adamant.png",
    discription: "Add composure equals to your methodology score",
    cost: 0,
    isPlayable: true,
    isShred: false,
  },
  digest: {
    id: "digest",
    title: "Digest",
    type: CardTypes.ATTACK,
    level: "1",
    uri: "./assets/Digest.png",
    discription:
      "Resolve 11 confusion, if the opponent is convinced, gain 5 methodology score, shred",
    cost: 1,
    isPlayable: true,
    isShred: true,
  },
  toilet_tour: {
    id: "toilet_tour",
    title: "Toilet Tour",
    type: CardTypes.NON_ATTACK,
    level: "1",
    uri: "./assets/Toilet_tour.png",
    discription:
      "Remove one negative debuff, shred",
    cost: 1,
    isPlayable: true,
    isShred: true,
  },
  first_of_all: {
    id: "first_of_all",
    title: "First of All",
    type: CardTypes.NON_ATTACK,
    level: "1",
    uri: "./assets/First_of_all.png",
    discription:
      "Shuffle one Secondly into your hand, shred",
    cost: 1,
    isPlayable: true,
    isShred: true,
  }
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
};

export const getRandomCards = (quantity: number) => {
  const cards = [];
  for (let i = 0; i < quantity; i++) {
    const id = getRandomCard();
    cards.push(Card.init(id, `${id}-ex-${Math.floor(Math.random() * 10000)}`));
  }
  return cards;
};
