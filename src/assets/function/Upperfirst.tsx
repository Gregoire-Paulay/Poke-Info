const Upperfirst = (str: string | undefined): string | undefined => {
  let newStr = "";
  if (str) {
    for (let i = 0; i < str.length; i++) {
      if (i === 0) {
        newStr += str[i].toUpperCase();
      } else {
        newStr += str[i];
      }
    }
    return newStr;
  }
};

export default Upperfirst;
