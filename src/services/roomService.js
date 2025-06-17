const db = require('../config/db');

// Fetch all rooms
exports.getAllRooms = async () => {
  const [rows] = await db.execute('SELECT * FROM room');
  return rows;
};

// Create a new room
exports.createRoom = async (data) => {
  const { type, charges_per_day, status } = data;

  await db.execute(
    'INSERT INTO room (type, charges_per_day, status) VALUES (?, ?, ?)',
    [type, charges_per_day, status]
  );
};

// Update room by ID
exports.updateRoom = async (id, data) => {
  const { type, charges_per_day, status } = data;

  await db.execute(
    'UPDATE room SET type = ?, charges_per_day = ?, status = ? WHERE roomId = ?',
    [type, charges_per_day, status, id]
  );
};

// Delete room by ID
exports.deleteRoom = async (id) => {
  await db.execute('DELETE FROM room WHERE roomId = ?', [id]);
};


exports.getRoomTypes = async () => {
  return ['General Ward', 'Private', 'ICU', 'Isolation', 'Maternity', 'Recovery'];
};

exports.getRoomStatuses = async () => {
  return ['available', 'occupy'];
};
