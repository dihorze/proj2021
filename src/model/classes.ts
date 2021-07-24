import { deckMaster } from "../data/deck";

export class Card {
  constructor(
    public key = Math.floor(Math.random() * 10000) + "",
    public id = "test",
  ) {}

  static fake() {
    return new Card();
  }

  static init(id: string, key: string) {
    const c = new Card();
    c.id = id;
    c.key = key;
    return c;
  }

  // return a new copy of the card
  copy() {
    return Card.init(this.id, this.key);
  }

  getCost() {
    return deckMaster[this.id].cost;
  }

  getTitle() {
    return deckMaster[this.id].title;
  }

  getType() {
    return deckMaster[this.id].type;
  }
  
  getUri() {
    return deckMaster[this.id].uri;
  }

  getLevel() {
    return deckMaster[this.id].level;
  }

  getDiscription() {
    return deckMaster[this.id].discription;
  }

  getIsPlayable() {
    return deckMaster[this.id].isPlayable;
  }

  getIsShred() {
    return deckMaster[this.id].isShred;
  }

  static getCardFromKey = (key: string) => {
    const id = key.split('-')[0];
    return Card.init(id, key);
  }
}

export interface BattleAnimation {
  type: string;
  payload: Payload;
}

interface Payload {
  callback?: Function;
  [key: string]: any;
}