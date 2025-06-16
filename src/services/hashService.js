    const bcrypt = require("bcrypt");

exports.hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};


exports.comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match; // true or false
  } catch (err) {
    console.error("Error comparing passwords:", err);
    throw err;
  }
};
