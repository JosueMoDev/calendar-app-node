const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarEventSchema = Schema({
    title: {
        type: String,
        require: true
    },
    start: {
        type: Date,
        require: true,
    },
    end: {
        type: Date,
        require: true
    },
    notes: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User'
    }

}, { collection: 'calendar-events' });
CalendarEventSchema.method('toJSON', function () { 
    const { __v, _id, ...object } = this.toObject();
    object.id = _id
    return object;
})
module.exports = mongoose.model('CalendarEvent', CalendarEventSchema);