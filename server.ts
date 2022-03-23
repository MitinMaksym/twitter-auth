
import dotenv from 'dotenv'
import app from './app'
import connectMongoDB from './core/db'
dotenv.config()


const port = process.env.PORT || 8080

connectMongoDB()

app.listen(port,() => {
    console.log(`Server is working on ${port}`)
})