import mongoose, { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  status: string
  source: string
  paid: number
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  status: {
    type: String,
    default: 'New',
  },

  source: {
    type: String,
    default: 'Website',
  },

  paid: {
    type: Number,
    default: 0,
  },
})

export default mongoose.model<IUser>(
  'Lead',
  userSchema
)