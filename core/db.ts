import mongoose from 'mongoose'

const connectMongoDB = () => {
  const DB =
    process.env?.DATABASE?.replace(
      '<password>',
      process.env.DATABASE_PASSWORD || ''
    ) || ''
  mongoose
    .connect(DB)
    .then(() => {
      console.log('DB is connected')
    })
    .catch((err) => {console.log(err)
    process.exit(1)
    })
}

export default connectMongoDB