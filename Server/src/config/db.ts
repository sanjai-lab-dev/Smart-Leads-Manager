import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/testdb'
    await mongoose.connect(uri)
    console.log('MongoDB Connected')
  } catch (error) {
    console.log('Database Error:', error)
    process.exit(1)
  }
}

export default connectDB