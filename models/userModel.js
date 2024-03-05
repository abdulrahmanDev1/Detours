const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false, // Do not include in query results by default
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // Validator to check if passwordConfirm matches password
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Middleware to hash password before saving to the database
userSchema.pre('save', async function (next) {
  // Only run this function if the password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with bcrypt
  this.password = await bcrypt.hash(this.password, 12);

  // Clear the passwordConfirm field as it is no longer needed
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  // Only run this function if the password was actually modified
  if (!this.isModified('password') || this.isNew) return next();

  // Subtract 1 second to ensure the token is created after the passwordChangedAt field
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Method to compare user-entered password with stored hashed password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Method to check if the user changed the password after receiving the JWT token
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    // Compare timestamps to determine if password changed after JWT issuance
    return JWTTimestamp < changedTimestamp;
  }

  // False means password NOT changed
  return false;
};

// Method to create a password reset token
userSchema.methods.createPasswordResetToken = function () {
  // Generate a random token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash the token and store it in the database
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  // Set the passwordResetExpires field to the current time + 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // Return the unhashed token to send to the user's email
  return resetToken;
};

// Create User model using the defined schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
