// fungsi untuk mengkonversi string ke bit
const charToBit = (char) => {
  const result = [];

  // Loop array char dari parameter
  for (let index = 0; index < char.length; index++) {
    // convert character ke bit menggunakan method .charCodeAt
    // menggunakan .padStart() untuk menambahkan padding bit
    const bit = char.charCodeAt(index).toString(2).padStart(8, "0");
    // push hasil bit ke variable result
    result.push(bit);
  }

  // Return value result
  return result;
};

// fungsi untuk menyesuaikan array secretKey sesuai panjang array plainText
const generateSecretKeyBit = (plainTextBitLength, secretKeyBit) => {
  const repeatedSecretKeyBit = [];
  let currentIndex = 0;

  for (let i = 0; i < plainTextBitLength; i++) {
    repeatedSecretKeyBit.push(secretKeyBit[currentIndex]);
    currentIndex = (currentIndex + 1) % secretKeyBit.length;
  }

  return repeatedSecretKeyBit;
};

// Fungsi untuk melakukan operasi XOR dari setiap char bit
const performXOR = (bit1, bit2) => {
  // menjadikan string ke array
  const bit1Split = bit1.split("");
  const bit2Split = bit2.split("");

  // loop array kemudian setiap bit di XOR kan antara 2 array tsb
  return bit1Split
    .map((_, index) => parseInt(bit1Split[index]) ^ parseInt(bit2Split[index]))
    .join("");
};

// Fungsi untuk encode plainText menerima parameter plainText dan secretKey
const encode = (plainText, secretKey) => {
  // Konversi plainText ke bit menggunakan fungsi charToBit
  const plainTextBit = charToBit(plainText);
  // Generate secretKeyBit dengan memanggil fungsi generateSecretKeyBit
  const secretKeyBit = generateSecretKeyBit(
    plainTextBit.length,
    charToBit(secretKey)
  );

  // Loop variable plainTextBit kemudian panggil fungsi performXOR untuk
  // melakukan operasi XOR
  const cipherTextBit = plainTextBit.map((_, index) =>
    performXOR(plainTextBit[index], secretKeyBit[index])
  );

  // menggabungkan array menjadi string
  return cipherTextBit.join("");
};

// Fungsi untuk decode bit ke string
const decode = (cipherText, secretKey) => {
  const cipherTextBit = [];

  // Pisah cipherBit menjadi 8 index kemudian masukkan ke array cipherTextBit
  for (let i = 0; i < cipherText.length; i += 8) {
    cipherTextBit.push(cipherText.substring(i, i + 8));
  }

  // Generate secretKeyBit dengan fungsi generateSecretKeyBit
  const secretKeyBit = generateSecretKeyBit(
    cipherTextBit.length,
    charToBit(secretKey)
  );

  // Lakukan XOR pada bit
  const plainTextBit = cipherTextBit.map((_, index) =>
    performXOR(cipherTextBit[index], secretKeyBit[index])
  );

  // Loop bit kemudian konversi dari bit ke string/char
  const result = plainTextBit.map((item) =>
    String.fromCharCode(parseInt(item, 2))
  );

  // menggabungkan array menjadi string
  return result.join("");
};

const key = "5";
const plainText = "hello";
console.log("plainText:", plainText);
console.log("key:", key);
console.log("");
const cipherTextBit = encode(plainText, key);
console.log("cipherTextBit:", cipherTextBit);
const decodeCipherText = decode(cipherTextBit, key);
console.log("decodeCipherText:", decodeCipherText);
