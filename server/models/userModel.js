const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define the schema for the User model
const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    // required: true,
   
  },
  role: {
    type: String,
    // required: true,
    
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
    otp: String,
    otpExpires: Date
});


// ✅ Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip if password hasn't changed

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

//Compareing Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};



// Generate JWT token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, email: this.email, role: this.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '12h' }
    );
    return token;
};


const User = mongoose.model('User', userSchema);

module.exports = User;