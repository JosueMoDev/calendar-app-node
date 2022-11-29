const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldsValidations } = require('../middlewares/fields-validations');

const {
    getAllCalendarEvents,
    createNewCalendarEvent,
    editCalendarEvent,
    deleteCalendarEvent }
    = require('../controllers/calendar-events.controller');

const { validateJWT } = require('../middlewares/validate-JWT');
const { isDate } = require('../helpers/isDate');
router.use(validateJWT);


router.get('/', getAllCalendarEvents);

router.post('/new-event', [
    check('title', 'title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom( isDate ),
    fieldsValidations,
    validateJWT
],createNewCalendarEvent);

router.put('/edit-event/:id', [
    check('title', 'title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom( isDate ),
    fieldsValidations,
    validateJWT
], editCalendarEvent);

router.delete('/delete-event/:id', deleteCalendarEvent);




module.exports = router;