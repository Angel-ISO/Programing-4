import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Debe ser un correo válido'],
    },
    age: {
      type: Number,
      min: 0,
      max: 120,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    social: {
      facebook: { type: String },
      twitter: { type: String },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('fullInfo').get(function () {
  return `${this.name} (${this.email}) - Edad: ${this.age ?? 'N/A'}`;
});

userSchema.methods.saludar = function () {
  return `Hola, soy ${this.name} y mi correo es ${this.email}`;
};

userSchema.methods.isAdult = function () {
  return this.age >= 18;
};

userSchema.pre('save', function (next) {
  if (!this.email.endsWith('@gmail.com')) {
    console.warn(`⚠️ Usuario con email no Gmail: ${this.email}`);
  }
  next();
});

userSchema.index({ email: 1 });

export const User = mongoose.model('User', userSchema);
