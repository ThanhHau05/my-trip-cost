import { DataFirebase } from '@/firebase';

export const handleTotalMoneyTheTrip = async (id: number) => {
  const trip = await DataFirebase.GetTrip(id);
  if (trip) {
    const totalInvoice = trip.invoice;
    if (totalInvoice) {
      const total = totalInvoice.reduce(
        (a, item) => a + item.money * item.qty + item.moneySuggest * item.qty,
        0,
      );
      return total;
    }
  }
  return 0;
};

export const handleRandomUid = () => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';

  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return `name-${randomString}`;
};

export const handleRandomIdInvoice = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomChar = () =>
    characters[Math.floor(Math.random() * characters.length)];

  return `${randomChar()}${randomChar()}${randomChar()}${randomChar()}${randomChar()}${randomChar()}`;
};

export const handleGetTimeAndDate = () => {
  const currentTimeAndDate = new Date();
  let hour = currentTimeAndDate.getHours();
  const minutes = currentTimeAndDate.getMinutes();
  const newMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const period = hour >= 12 ? 'PM' : 'AM';
  if (hour > 12) {
    hour -= 12;
  }
  const day = currentTimeAndDate.getDate();
  const month = currentTimeAndDate.getMonth() + 1;
  const newMonth = month < 10 ? `0${month}` : month;
  const year = currentTimeAndDate.getFullYear();
  return `${hour}:${newMinutes} ${period} - ${newMonth}/${day}/${year}`;
};

export const handleFormatCurrentcy = (money: number) => {
  const valueNumber = money.toLocaleString('vi-VN');
  const value = valueNumber.replace(/,/g, '.');
  return value.toString();
};

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

export const handleConvertNumberTotextinVND = (money: number) => {
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

export const handleChangeNameStyle = (name: string) => {
  const value = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '');

  const test = /[!@#$%^&*()_\-+=|/<>,:;"{}[\]?'.]/g;
  const result = value.replace(test, '');

  if (result.length > 15) {
    return result.slice(0, 15);
  }

  return result;
};
