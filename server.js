const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/engineering-scheduler', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schedule Model
const Schedule = require('./models/Schedule');

// API Routes
app.get('/api/schedules', async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.json(schedules);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/schedules', async (req, res) => {
    try {
        const schedule = new Schedule(req.body);
        await schedule.save();
        res.status(201).json(schedule);
    } catch (err) {
        res.status(400).json({ error: 'Invalid data' });
    }
});

app.delete('/api/schedules/:id', async (req, res) => {
    try {
        await Schedule.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/timetable', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'timetable.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});