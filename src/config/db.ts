import mongoose from 'mongoose'

export async function connectDB(uri: string) {
  try {
    if (!uri) {
      throw new Error('MongoDB URI is not defined')
    }
    await mongoose.connect(uri)
    console.log('MongoDB connected successfully')
    
    // Add connection error handler
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error)
    })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}