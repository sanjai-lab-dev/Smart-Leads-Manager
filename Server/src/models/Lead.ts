import mongoose, { Document } from 'mongoose'

export interface ILead extends Document {
  name: string
  email: string
  status: string
  source: string
  paid: number
  date: string
  time: string
}

const leadSchema = new mongoose.Schema<ILead>({
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
  date: {
    type: String,
    default: () =>
      new Date().toISOString().split("T")[0]
  },

  time: {
    type: String,
    default: () =>
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
  }

})

export default mongoose.model<ILead>(
  'Lead',
  leadSchema
)