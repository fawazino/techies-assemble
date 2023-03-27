const express =  require("express")
const app = express()
const bodyParser = require("body-parser")
const Users =  require("./user.json").users
const path = require("path")
const alert = require("alert")
const port = 3030 || process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'))
})

app.post("/login", async(req, res) => {
    // takes the email and password input from the form body
    const {email, password} = req.body

    //checks if the email and password input matches the credentials in the json database
   let  user = await Users.find(user => user.email == email &&  user.password == password)

   // if the input matches, return a success message
        if (user){
           return res.status(200).json({Success: "Login successful"})
        }
        // if the input does not match, return an error message
      else { return res.status(400).json({Error: "Invalid credentials"}) }

   
})

app.listen(port, async () => {
    console.log("server has started on port ", port, ' 🚀')
})