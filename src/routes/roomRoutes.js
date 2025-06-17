const express = require('express');
const router = express.Router();
const roomController = require('../controller/roomController');

// View all rooms
router.get('/rooms', roomController.getAllRooms);

// Show form to create a new room
router.get('/rooms/create', roomController.showAddRoomForm);

// Handle new room creation
router.post('/rooms', roomController.createRoom);

// Show edit form for a specific room
router.get('/rooms/:id/edit', roomController.showEditRoomForm);

// Handle room update
router.post('/rooms/:id', roomController.updateRoom);

// Handle room deletion
router.post('/rooms/:id/delete', roomController.deleteRoom);

module.exports = router;
