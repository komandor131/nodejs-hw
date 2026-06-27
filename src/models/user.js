import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Hook pre('save') to default username to email if not provided
userSchema.pre('save', function (next) {
  if (!this.username) {
    this.username = this.email;
  }
  if (typeof next === 'function') {
    next();
  }
});

// Custom toJSON method to remove password field
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
