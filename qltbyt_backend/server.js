const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db')
const app = express();

// Connect Database
connectDB();

// Configure CORS
app.use(cors());

app.options('*', cors());

// Init Middleware
app.use(express.json({ extended: false}));

app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/maintains', require('./routes/api/maintains'));
app.use('/api/devices', require('./routes/api/devices'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/providers', require('./routes/api/providers'))
app.use('/api/departments', require('./routes/api/departments'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));