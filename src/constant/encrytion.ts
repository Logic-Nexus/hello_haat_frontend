import cryptoJS from "crypto-js";

const SECRET_KEY = "Hello_Haat"; // Corrected spelling

const encryptData = (data: any) => {
  if (!data) return null;
  try {
    const encryptedData = cryptoJS.AES.encrypt(
      JSON.stringify(data),
      SECRET_KEY
    ).toString();
    return encryptedData;
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};
const decryptData = (key: string) => {
  const data = localStorage.getItem(key) || null;
  if (!data) {
    console.error("No data to decrypt");
    return null;
  }
  try {
    const bytes = cryptoJS.AES.decrypt(data, SECRET_KEY);
    const decryptedData = bytes.toString(cryptoJS.enc.Utf8);

    // Check if decryption resulted in an empty string
    if (!decryptedData) {
      console.error("Decryption resulted in an empty string");
      return null;
    }

    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

export { encryptData, decryptData };
