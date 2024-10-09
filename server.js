//hi
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

// Middleware
app.use(bodyParser.json());

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Enable CORS for your Chrome extension and ManyChat
const allowedOrigins = [
  'chrome-extension://peocfaidaaapphkobejpfmacidflbmbg',
  'chrome-extension://aodmfeklobopeiaecghoinchchejnege',
  'chrome-extension://ablejgigikdikmbilfcnoekmfpceikkg',
  'chrome-extension://idlnielcojoambdppgenfkffcjlikgkn',
  'https://manychat.com',
  'https://torpid-continuous-bracket.glitch.me' // Add your own domain
];


app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: Origin ${origin} is not allowed`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST',
  allowedHeaders: ['Content-Type'],
  credentials: true // Allow credentials (cookies) to be sent
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// Serve googlepay.html when accessing /googlepay
app.get('/googlepay', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'googlepay.html'));
});

// Serve paypal.ejs when accessing /paypal
app.get('/paypal', (req, res) => {
  res.render('paypal', {
    price: 4.99,
    total: 4.99,
    clientId: process.env.PAYPAL_CLIENT_ID // Pass the PayPal client ID dynamically
  });
});



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
