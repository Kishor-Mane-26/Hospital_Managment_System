const roomService = require('../services/roomService');


exports.showAddRoomForm = async (req, res) => {
  const roomTypes = await roomService.getRoomTypes(); // hypothetical function
  const roomStatuses = await roomService.getRoomStatuses();

  res.render('rooms/create', { roomTypes, roomStatuses });
};

exports.showEditRoomForm = async (req, res) => {
  const rooms = await roomService.getAllRooms();
  const room = rooms.find(r => r.roomId == req.params.id);
  res.render('rooms/edit', { room, roomTypes, roomStatuses });
};

exports.getAllRooms = async (req, res) => {
  const rooms = await roomService.getAllRooms();
  res.render('rooms/index', { rooms });
};



exports.createRoom = async (req, res) => {
  try {
    await roomService.createRoom(req.body);
    res.redirect('/rooms');
  } catch (err) {
    res.send('Error: ' + err.message);
  }
};

exports.showEditRoomForm = async (req, res) => {
  const rooms = await roomService.getAllRooms();
  const room = rooms.find(r => r.roomId == req.params.id);
  res.render('rooms/edit', { room });
};

exports.updateRoom = async (req, res) => {
  try {
    await roomService.updateRoom(req.params.id, req.body);
    res.redirect('/rooms');
  } catch (err) {
    res.send('Error: ' + err.message);
  }
};

exports.deleteRoom = async (req, res) => {
  await roomService.deleteRoom(req.params.id);
  res.redirect('/rooms');
};
