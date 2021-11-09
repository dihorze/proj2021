import { deckMaster } from "../data/deck";

const links = [
  "./assets/card1.png",
  "./assets/card2.png",
  "./assets/card3.png",
  "./assets/draw_stack.png",
  "./assets/stack.png",
  "./assets/paper_card.png",
  "./assets/office.png",
];

export const preloadAllAssets = () => {
  for (const cardKey in deckMaster) {
    const img = new Image();
    img.src = deckMaster[cardKey].uri;
  }
  links.forEach((link) => (new Image().src = link));
};
