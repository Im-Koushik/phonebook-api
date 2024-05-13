import crypto from "crypto-js";

export const encryptPhoneNumber = (phoneNumber, secretKey) => {
  const encryptedNumber = crypto.AES.encrypt(phoneNumber, secretKey).toString();
  return encryptedNumber;
};

export const decryptPhoneNumber = (phoneNumber, secretKey) => {
  const decryptedNumber = crypto.AES.decrypt(phoneNumber, secretKey).toString(
    crypto.enc.Utf8
  );
  return decryptedNumber;
};
