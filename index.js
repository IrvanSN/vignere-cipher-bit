// Perform char plainText to bit
const charToBit = (char) => {
  const result = [];

  for (let index = 0; index < char.length; index++) {
    const bit = char.charCodeAt(index).toString(2).padStart(8, "0");
    result.push(bit);
  }

  return result;
};

// Repeat secretKeyBit elements to match the length of plainTextBit
const generateSecretKeyBit = (plainTextBitLength, secretKeyBit) => {
  const repeatedSecretKeyBit = [];
  let currentIndex = 0;

  for (let i = 0; i < plainTextBitLength; i++) {
    repeatedSecretKeyBit.push(secretKeyBit[currentIndex]);
    currentIndex = (currentIndex + 1) % secretKeyBit.length;
  }

  return repeatedSecretKeyBit;
};

// Perform XOR bit
const performXOR = (bit1, bit2) => {
  const bit1Split = bit1.split("");
  const bit2Split = bit2.split("");

  return bit1Split
    .map((_, index) => parseInt(bit1Split[index]) ^ parseInt(bit2Split[index]))
    .join("");
};

// encode function
const encode = (plainText, secretKey) => {
  const plainTextBit = charToBit(plainText);
  const secretKeyBit = generateSecretKeyBit(
    plainTextBit.length,
    charToBit(secretKey)
  );

  console.log("encode plainTextBit", plainTextBit);
  console.log("encode secretKeyBit", secretKeyBit);

  const cipherTextBit = plainTextBit.map((_, index) =>
    performXOR(plainTextBit[index], secretKeyBit[index])
  );

  return cipherTextBit.join("");
};

// decode function
const decode = (cipherText, secretKey) => {
  const cipherTextBit = [];

  for (let i = 0; i < cipherText.length; i += 8) {
    cipherTextBit.push(cipherText.substring(i, i + 8));
  }

  const secretKeyBit = generateSecretKeyBit(
    cipherTextBit.length,
    charToBit(secretKey)
  );

  console.log("decode cipherTextBit", cipherTextBit);
  console.log("decode secretKeyBit", secretKeyBit);

  const plainTextBit = cipherTextBit.map((_, index) =>
    performXOR(cipherTextBit[index], secretKeyBit[index])
  );

  console.log("decode plainTextBit", plainTextBit);

  const result = plainTextBit.map((item) =>
    String.fromCharCode(parseInt(item, 2))
  );

  return result.join("");
};

const key = "10101 01010";
const cipherText = encode("haizooz ss", key);
console.log("cipherText", cipherText);
const decodeCipherText = decode(cipherText, key);
console.log("decodeCipherText", decodeCipherText);
