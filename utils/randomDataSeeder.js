const crypto = require('crypto');

function getRandomNumber({ min = 1, max = 9999, length } = {}) {
  let number = Math.floor(Math.random() * (max - min + 1)) + min;

  // If length is specified, generate random digits
  if (length) {
    const maxVal = 10 ** length - 1;
    const minVal = 10 ** (length - 1);
    number = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
  }
  return number;
}

function getRandomString(length = 8) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

function generateUser() {
  const id = Math.floor(1000 + Math.random() * 9000);
  const username = `user${Math.floor(Math.random() * 1000)}`;
  const email = `${username}@test.com`;
  const password = (getRandomString(10)).toString();

  return { id, email, password };
};

function createRandomBook() {
  const id = getRandomNumber(1, 1000);
  const name = `Book_${getRandomString(4)}`;
  const author = `Author_${getRandomString(4)}`;
  const published_year = getRandomNumber(1980, 2025);
  const book_summary = `Summary_${getRandomString(8)}`;

  return { id, name, author, published_year, book_summary };
}

module.exports = { generateUser, createRandomBook };
