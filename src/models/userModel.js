import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // 'admin' ya 'user'
}, { timestamps: true });

// Password ko save karne se pehle hash (encrypt) karna
userSchema.pre('save', async function() {
  // Agar password modify nahi hua to kuch mat karo
  if (!this.isModified('password')) return;

  // Password hashing logic yahan likhein (bcrypt use karte hue)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  // NOTE: Yahan next() likhne ki zaroorat nahi hai agar function 'async' hai
});

const User = mongoose.model('User', userSchema);
export default User;