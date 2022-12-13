require('dotenv').config()
const path = require('path')
 
PORT = process.env.PORT || 3000

const express = require('express')
const {MongoClient} = require('mongodb')
const cors = require('cors')
const uri = "mongodb+srv://nnamtran:87422491243Nam@cluster0.w7tfk6i.mongodb.net/?retryWrites=true&w=majority";

const app = express()
app.use(cors())
app.use(express.json())
// account: nnamtran - 87422491243Nam
app.get('/test', (req, res, next) => {
    res.json('Hello to my app')
}) 

app.get('/contact', async(req, res) => {
    const client = new MongoClient(uri)
    const formData = JSON.parse(req.query.formData)
    
    const email = formData.email

    try {
        await client.connect()
        const database = client.db('app-data')
        const checkin = database.collection('qrcode')
        const register = database.collection('register-result')

        const query = {email: email}
        const user = await checkin.findOne(query)
        
        const location = user.location
        const query2 = {location: location}
        const users = await checkin.find(query2).toArray()
        const response = users.map((item) => ({
            name: item.name,
            mobile: item.mobile,
            email: item.email,
            time: item.time,
            location: item.location
        }))
        res.send(response)

    } catch(error) {
        console.log(error)
    }
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}


app.listen(PORT, () => console.log('Server running on PORT' + PORT))