// login_data.ts

import mongoose from 'mongoose'

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
})

const LoginData = mongoose.model('LoginData', loginSchema)

export default LoginData