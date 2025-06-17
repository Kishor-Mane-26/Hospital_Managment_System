const roomService = require('../services/roomService');


exports.showAddRoomForm = async (req, res) => {
  const roomTypes = await roomService.getRoomTypes(); // hypothetical function
  const roomStatuses = await roomService.getRoomStatuses();

  res.render('rooms/create', { roomTypes, roomStatuses });
};

exports.showEditRoomForm = async (req, res) => {
  try {
    const rooms = await roomService.getAllRooms();
    const room = rooms.find(r => r.roomId == req.params.id);
    const roomTypes = ['General', 'ICU', 'Deluxe', 'Private'];
    const roomStatuses = ['Available', 'Occupied', 'Cleaning', 'Maintenance'];

    res.render('rooms/edit', { room, roomTypes, roomStatuses });
  } catch (error) {
    console.error('Error loading edit room form:', error);
    res.status(500).send('Internal Server Error');
  }
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

exports.updateRoom = async (req, res) => {
  try {
    const { type, charges_per_day, status } = req.body;
    const roomId = req.params.id;

    // Call your service or DB function to update the room
    await roomService.updateRoom(roomId, { type, charges_per_day, status });
    console.log('Updating room with type:', type);  // should be exactly like 'Private'

    res.redirect('/rooms');
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).send('Internal Server Error');
  }
};


exports.deleteRoom = async (req, res) => {
  await roomService.deleteRoom(req.params.id);
  res.redirect('/rooms');
};
