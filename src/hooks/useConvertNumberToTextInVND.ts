const ones = [
  'không',
  'một',
  'hai',
  'ba',
  'bốn',
  'năm',
  'sáu',
  'bảy',
  'tám',
  'chín',
];

const units = ['', 'nghìn', 'triệu', 'tỷ'];

function readGroupOfThreeDigits(number: number) {
  const hundreds = Math.floor(number / 100);
  const tens = Math.floor((number % 100) / 10);
  const onesDigit = number % 10;

  let result = '';
  if (hundreds > 0) {
    result += `${ones[hundreds]} trăm `;
  }

  if (tens > 0) {
    if (tens === 1) {
      result += 'mười ';
    } else {
      result += `${ones[tens]} mươi `;
    }
  }

  if (onesDigit > 0) {
    if (result.length > 0) {
      result += ' ';
    }
    if (tens === 0 && hundreds > 0) {
      result += 'linh ';
    }
    result += ones[onesDigit];
  }

  return result;
}

export const useConvertNumberTotextinVND = (money: number) => {
  let number = money;
  if (number === 0) {
    return `${ones[0]} đồng`;
  }

  const groups = [];
  while (number > 0) {
    groups.push(number % 1000);
    number = Math.floor(number / 1000);
  }

  let words = '';
  for (let i = groups.length - 1; i >= 0; i--) {
    const group = groups[i];
    if (group && group > 0) {
      words += `${readGroupOfThreeDigits(group)} ${units[i]} `;
    }
  }

  return `${words.trim()} đồng`;
};
