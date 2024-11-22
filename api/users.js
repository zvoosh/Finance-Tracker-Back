const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserTable = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

var router = Router();

// Route to login (authentication)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await UserTable.findOne({ username });

    if (!user) {
      return res.status(401).send("Invalid username or password");
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid username or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, username: user.username },
      "zvoosh-secrets", // Replace with your secret key
      { expiresIn: "1h" } // Set token expiration (optional)
    );

    // Send the token and user _id
    res.json({ token, _id: user._id });
  } catch (err) {
    console.log(`${err} : LoginError`);
    res.status(500).send("Internal Server Error");
  }
});

// GET all users
router.get("/", authMiddleware, (req, res) => {
  UserTable.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(`${err} : GetAllUsers`);
    });
});

// GET user by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const result = await UserTable.findById(req.params.id);
    if (!result) {
      return res.status(404).send("User not found");
    }
    res.send(result);
  } catch (err) {
    console.log(`${err} : GetOneUser`);
    res.status(500).send("Error getting user");
  }
});

// CREATE new user
router.post("", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserTable({
      username,
      password: hashedPassword,
    });

    await user.save();
    res.send(user);
  } catch (err) {
    console.log(`${err} : PostUser`);
    res.status(500).send("Error creating user");
  }
});

// UPDATE user
router.put("/:id/", authMiddleware, async (req, res) => {
  try {
    const result = await UserTable.findById(req.params.id);
    if (!result) {
      return res.status(404).send("User not found");
    }

    // Update the requested user info
    result.username = req.body.username;

    // Check if the password is being updated
    if (req.body.password) {
      // Hash the new password before saving it
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      result.password = hashedPassword;
    }

    await result.save();
    res.send("success");
  } catch (err) {
    console.log(`${err} : EditOneUser`);
    res.status(500).send("Error updating user");
  }
});

// DELETE user
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedUser = await UserTable.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.status(200).send("User deleted successfully");
  } catch (err) {
    console.error(`${err} : DeleteOneUser`);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
