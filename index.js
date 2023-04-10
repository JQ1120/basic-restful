const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000

app.use(express.json());

let dbUsers=
[
    {
        username: "cheok",
        password: "password",
        name:   "cheok",
        email: "cheokjiaqing@gmail.com",
    },
    {
        username: "Ali",
        password: "123456",
        name: "Ali",
        email: "ali@gmail.com",
    },
    {
        username: "Muthu",
        password: "246810",
        name: "Muthu",
        email: "Muthu@gmail.com",
    },
    {
        username: "Peter",
        password: "Peter",
        name: "Peter",
        email: "peter@gmail.com",
    }
]

function login(username,password)
{
    console.log ("someone tried to login with",username,password)
    let matched = dbUsers.find (element => 
    element.username ==username)
    if (matched){
        if(matched.password ==password)
        {
            return "User Logged in"
        }else {
            return "Password not matched"
        }
    }else{
        return "Username not found"
    }
}

function register(newusername,newpassword,newname,newemail){
    let matched=dbUsers.find(element => element.username == newusername)
    if (matched){
        return "Username is unavailable. Please try again!"
    } else{
        dbUsers.push({
            username:newusername,
            password:newpassword,
            name:newname,
            email:newemail,
        })
        return "User is registered"
    }
    
}

app.get('/hello',verifyToken,(req, res) => { 
    console.log(req.user)
    
  res.send('Hello World!');
});

 app.post('/login',(req,res)=>{
    let data = req.body
    //  res.send(
    //   login(
    //   data.username,data.password
    let user = login(data.username,data.password);

    res.send(generateToken(user))
    });

 app.post('/register',(req,res)=>{
  let data = req.body
   res.send(
    register(
    data.username,data.password,data.name,data.email
   ));
});

app.get('/bye', (req, res) => {
    res.send('Bye Bye World!');});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//To verify JWT Token
function verifyToken(req,res,next){
    let header = req.headers.authorization
    console.log (header)
    
    let token = header.split(' ')[1]

    jwt.verify(token,'secret',function(err,decoded){
        if(err){
        res.send("Invalid Token")
    }
    
    console.log(decoded)
    req.user = decoded
    next()
});
}

//To generate JWT token
function generateToken(userProfile){
    return jwt.sign(
        {userProfile},
    'secret',{expiresIn:60*60});
    }
