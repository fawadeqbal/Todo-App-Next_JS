const crypto = require('crypto');

const generateSecretKey = () => {
  // Generate a random 256-bit key (32 bytes)
  const secretKey = crypto.randomBytes(32).toString('hex');
  return secretKey;
};

console.log('Generated Secret Key:', generateSecretKey());
