const db = require('../config/db');

// Add room with validation
exports.createRoom = async ({ type, charges_per_day, status = 'available' }) => {
  if (!type || !charges_per_day) {
    throw new Error('Room type and charges_per_day are required');
  }
  if (isNaN(charges_per_day) || charges_per_day <= 0) {
    throw new Error('Charges must be a valid positive number');
  }

  const [result] = await db.query(
    'INSERT INTO room (type, charges_per_day, status) VALUES (?, ?, ?)',
    [type, charges_per_day, status]
  );
  return result;
};

// Get all rooms
exports.getAllRooms = async () => {
  const [rows] = await db.query('SELECT * FROM room');
  return rows;
};

// Update room by ID
exports.updateRoom = async (roomId, { type, charges_per_day, status }) => {
  const [result] = await db.query(
    'UPDATE room SET type = ?, charges_per_day = ?, status = ? WHERE roomId = ?',
    [type, charges_per_day, status, roomId]
  );
  return result;
};

// Delete room by ID
exports.deleteRoom = async (roomId) => {
  const [result] = await db.query('DELETE FROM room WHERE roomId = ?', [roomId]);
  return result;
};
