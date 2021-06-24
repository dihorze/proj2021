import { Card, CardTypes } from "../model/classes";

const deck: {[key: string] : Card } = {
  "key": Card.fake(),
  "test0": new Card(0, CardTypes.ATTACK),
  "test1": new Card(1, CardTypes.NON_ATTACK)
}

export const getCardType = (key: string | number) => {
  if (typeof(key) === "string") return deck[key].type;
  else return key % 2; // test
}