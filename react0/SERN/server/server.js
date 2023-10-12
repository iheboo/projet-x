const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./models'); // Make sure this points to your models directory
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require('./routes/registerRoutes');
const productRoutes = require('./routes/productRoutes');
// const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: 'userId',
    secret: 'subscribe',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);


// Sync  models with the database
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Models synced with the database');
    // Start the server after successful model sync
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Error syncing models with the database:', err);
  });

app.use('/api', productRoutes);
  // app.use('/api', reviewRoutes);
app.use('/api', authRoutes);
app.use('/api', registerRoutes);

