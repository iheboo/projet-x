
const mongoose = require('mongoose');
// MongoDB connection
mongoose.connect('mongodb://localhost/_db_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
