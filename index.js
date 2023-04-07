const express = require('express')
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


app.get('/', (req, res) => {
  res.send('Hello World!');
});

 app.post('/',(req,res)=>{
    let data = req.body
     res.send(
      login(
      data.username,data.password
     ));
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
