const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    className: { type: String, required: true },
    subject: { type: String, required: true },
    teacher: { type: String, required: true }
});

module.exports = mongoose.model('Schedule', scheduleSchema);