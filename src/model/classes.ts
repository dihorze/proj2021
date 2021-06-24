export const CardTypes = {
  NONE: "NONE",
  ATTACK: "ATTACK",
  NON_ATTACK: "NON_ATTACK",
};

export class Card {
  constructor(
    public key = Math.floor(Math.random() * 10000),
    public type = CardTypes.ATTACK
  ) {}

  static fake() {
    return new Card();
  }
}
