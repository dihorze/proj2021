export const shuffle = (arr: any[], inplace = false) => {
  
  const array = inplace ? arr : [...arr];

  let currentIndex = array.length,  randomIndex: number;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}