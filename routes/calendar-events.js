const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldValidations } = require('../middlewares/fields-validations');

const { getAllCalendarEvents, createNewCalendarEvent, editCalendarEvent, deleteCalendarEvent } = require('../controllers/calendar-events.controller');

const { validateJWT } = require('../middlewares/validate-JWT');

router.get('/', validateJWT, getAllCalendarEvents);

router.post('/new-event', validateJWT, createNewCalendarEvent);

router.put('/edit-event/:id', validateJWT, editCalendarEvent);

router.delete('/delete-event/:id', validateJWT, deleteCalendarEvent);




module.exports = router;