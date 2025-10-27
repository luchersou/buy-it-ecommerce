export const luhnCheck = (cardNumber) => {
  const digits = cardNumber.replace(/\s/g, "").split("").reverse();
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    let digit = parseInt(digits[i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  return sum % 10 === 0;
};
