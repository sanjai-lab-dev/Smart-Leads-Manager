// db.ts

import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb')

    console.log('MongoDB Connected')
  } catch (error) {
    console.log('Database Error')

    process.exit(1)
  }
}

export default connectDB