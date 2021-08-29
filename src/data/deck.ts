import { Card } from "../model/classes";

export const CardTypes = {
  NONE: "NONE",
  REASONING: "REASONING",
  REACTING: "REACTING",
  PREPARATION: "PREPARATION",
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
  isAiming: boolean;
}

export const deckUndergrad: { [id: string]: PrototypeCard } = {
  // starting
  explain: {
    id: "explain",
    title: "Explain",
    type: CardTypes.REASONING,
    level: "0",
    uri: "./assets/Explain.png",
    discription: "Resolve 8 confunsion",
    cost: 1,
    isPlayable: true,
    isShred: false,
    isAiming: true,
  },
  calm: {
    id: "calm",
    title: "Calm",
    type: CardTypes.REACTING,
    level: "0",
    uri: "./assets/Calm.png",
    discription: "Add 8 composure",
    cost: 1,
    isPlayable: true,
    isShred: false,
    isAiming: false,
  },
  smile_and_nod: {
    id: "smile_and_nod",
    title: "Smile and Nod",
    type: CardTypes.REACTING,
    level: "0",
    uri: "./assets/Smile_and_nod.png",
    discription: "Add 6 composure, draw 1 card",
    cost: 1,
    isPlayable: true,
    isShred: false,
    isAiming: false,
  },
  quick_reference: {
    id: "quick_reference",
    title: "Quick Reference",
    type: CardTypes.REASONING,
    level: "0",
    uri: "./assets/Quick_reference.png",
    discription: "Resolve 5 confusion, gain 2 clarity",
    cost: 1,
    isPlayable: true,
    isShred: false,
    isAiming: true,
  },
  // level 1000
  innocence: {
    id: "innocence",
    title: "Innocence",
    type: CardTypes.REACTING,
    level: "1",
    uri: "./assets/Innocence.png",
    discription: "Add 13 composure, add 10 confusion for all opponents",
    cost: 1,
    isPlayable: true,
    isShred: false,
    isAiming: false,
  },
  wait_for_it: {
    id: "wait_for_it",
    title: "Wait For It",
    type: CardTypes.REACTING,
    level: "1",
    uri: "./assets/Wait_for_it.png",
    discription:
      "The damage dealt this turn is transferred to the next turn, start a new turn, shred",
    cost: 0,
    isPlayable: true,
    isShred: true,
    isAiming: false,
  },
  pardon: {
    id: "pardon",
    title: "Pardon",
    type: CardTypes.REACTING,
    level: "1",
    uri: "./assets/Pardon.png",
    discription:
      "The same move will be performed by your opponents in the next turn, shred",
    cost: 2,
    isPlayable: true,
    isShred: true,
    isAiming: false,
  },
  pep_talk: {
    id: "pep_talk",
    title: "Pep Talk",
    type: CardTypes.REASONING,
    level: "1",
    uri: "./assets/Pep_talk.png",
    discription: "Resolve 25 confusion to people who like your research, shred",
    cost: 1,
    isPlayable: true,
    isShred: true,
    isAiming: false,
  },
  barrage: {
    id: "barrage",
    title: "Barrage",
    type: CardTypes.REASONING,
    level: "1",
    uri: "./assets/Barrage.png",
    discription: "Resolve 6 confusion X times",
    cost: -1,
    isPlayable: true,
    isShred: false,
    isAiming: true,
  },
  vehement: {
    id: "vehement",
    title: "Vehement",
    type: CardTypes.REASONING,
    level: "1",
    uri: "./assets/Vehement.png",
    discription:
      "If your motivation is the highest status, resolve 15 confusion and apply 2 impressionable to all opponent",
    cost: 2,
    isPlayable: true,
    isShred: false,
    isAiming: false,
  },
  adamant: {
    id: "adamant",
    title: "Adamant",
    type: CardTypes.REACTING,
    level: "1",
    uri: "./assets/Adamant.png",
    discription: "Add composure equals to your methodology score",
    cost: 0,
    isPlayable: true,
    isShred: false,
    isAiming: false,
  },
  digest: {
    id: "digest",
    title: "Digest",
    type: CardTypes.REASONING,
    level: "1",
    uri: "./assets/Digest.png",
    discription:
      "Resolve 11 confusion, if the opponent is convinced, gain 5 methodology score, shred",
    cost: 1,
    isPlayable: true,
    isShred: true,
    isAiming: true,
  },
  toilet_tour: {
    id: "toilet_tour",
    title: "Toilet Tour",
    type: CardTypes.PREPARATION,
    level: "1",
    uri: "./assets/Toilet_tour.png",
    discription: "Remove one negative debuff, shred",
    cost: 1,
    isPlayable: true,
    isShred: true,
    isAiming: false,
  },
  first_of_all: {
    id: "first_of_all",
    title: "First of All",
    type: CardTypes.PREPARATION,
    level: "1",
    uri: "./assets/First_of_all.png",
    discription: "Shuffle one Secondly into your hand, shred",
    cost: 1,
    isPlayable: true,
    isShred: true,
    isAiming: false,
  },
  secondly: {
    id: "secondly",
    title: "Secondly",
    type: CardTypes.PREPARATION,
    level: "1",
    uri: "./assets/Secondly.png",
    discription: "Shuffle one Nevertheless into your hand, shred",
    cost: 2,
    isPlayable: true,
    isShred: true,
    isAiming: false,
  },
  nevertheless: {
    id: "nevertheless",
    title: "Nevertheless",
    type: CardTypes.PREPARATION,
    level: "1",
    uri: "./assets/Nevertheless.png",
    discription: "Shuffle one Last But Not Least into your hand, shred",
    cost: 2,
    isPlayable: true,
    isShred: true,
    isAiming: false,
  },
  last_but_not_least: {
    id: "last_but_not_least",
    title: "Last_but_not_least",
    type: CardTypes.PREPARATION,
    level: "1",
    uri: "./assets/Last_but_not_least.png",
    discription:
      "At the end of your turn, all opponents reduce confusion equal to your motivation",
    cost: 2,
    isPlayable: true,
    isShred: true,
    isAiming: false,
  },
};

export const deckMaster = { ...deckUndergrad };

export const getCardType = (key: string) => {
  const id = key.split("-")[0];

  return deckMaster[id]?.type;
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
