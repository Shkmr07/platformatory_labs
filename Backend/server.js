require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const { dbConnect } = require("./src/Config/db.config");
const { UserModel } = require("./src/models/user.model");
require("./src/Config/passport"); // import passport config

const PORT = 5000;;
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));
  

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
  res.send("Temporal API");
});

app.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});


app.get("/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"  // 👈 forces account selection every time
  })
);


app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  function(req, res) {
    // 👇 Redirect back to your React frontend after login
    res.redirect("http://localhost:5173");
  }
);


app.get("/auth/success", (req, res) => {
  res.send("Login successful!");
});

app.get("/auth/failure", (req, res) => {
  res.send("Login failed");
});

// Logout route
app.get("/auth/logout", (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
  
      req.session.destroy(() => {
        res.clearCookie("connect.sid"); // optional: clear session cookie
        res.send("Logged out successfully");
      });
    });
  });

  
app.post('/auth/update-user', async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: 'Unauthorized' });
    
    const { phoneNumber, city, pincode } = req.body;

    try {
      await UserModel.findOneAndUpdate(
        { googleId: req.user.googleId },
        { phoneNumber, city, pincode },
        { new: true }
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update user' });
}

    

  });
  
app.listen(PORT, () => {
  dbConnect();
  console.log(`Server running on port ${PORT}`);
});
