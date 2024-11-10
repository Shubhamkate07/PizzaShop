const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const  bcryptjs = require('bcryptjs');

const PORT=5000;

const app = express();
app.use(express.json()); // body parser to handle i/p sent by user however user send data in form format then in using postman we sent data in json format then in encoded format so all this handled by bodyparser we get data in which format we need.
app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/Food'
   )
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));



const Fooddata = new mongoose.Schema({
    pizza1: Number,
    pizza2: Number,
    pizza3:Number,
    pizza4:Number,
    address:String
});



const RegistrationData = new mongoose.Schema({
    name:String,
    phoneNumber:String,
    address:String,
    password:String
});




const AdminData = new mongoose.Schema({
   username:String,
   password:String
});

const foodcolln = mongoose.model('foodcolln', Fooddata);

const registerdata = mongoose.model('registerdata', RegistrationData);

const Admindetals = mongoose.model('Admindetals', AdminData);


app.get('/',(req,res)=>{
    res.send("Hey there")
});



app.post('/order',async(req,res)=>{
   try{
    const orderdata={
        pizza1:req.body.pizza1,
        pizza2:req.body.pizza2,
        pizza3:req.body.pizza3,
        pizza4:req.body.pizza4,
        address:req.body.address
    }

    await foodcolln.insertMany([orderdata]);
    console.log([orderdata]);
   res.send("order send but why on console and not on page now possible");
   }catch(err){
    console.log(err);
   }

});



app.get('/check',async(req,res)=>{
   try{
    const orderdetails= await foodcolln.find();
    
   res.json(orderdetails);
console.log(orderdetails);
   
   }catch(err){
    console.log(err);
   }
});


app.post('/regi',async (req,res)=>{


    const Datareg={
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    password:req.body.password

    }

    const hashedPassword= await bcryptjs.hash(Datareg.password, 10);

    Datareg.password=hashedPassword;


   const user= await registerdata.findOne({phoneNumber: Datareg.phoneNumber});

    if(user){
      return  res.json('User Alerdy Exists with this Number.');
    }
    await registerdata.insertMany([Datareg]);
    res.json('registration success');
    console.log([Datareg]);  
    
});
app.post('/log', async(req,res)=>{


    try{
    const DataLogin={
        username:req.body.username,
        password:req.body.password,
        phoneNumber: req.body.phoneNumber
    }

    const user =await registerdata.findOne({phoneNumber: DataLogin.phoneNumber});

    if(!user){
        return res.json('User Not found Please register..');
    }

    const isPasswordMatch= await bcryptjs.compare(DataLogin.password, user.password);

    if(!isPasswordMatch){
        return res.json('Invalid username password or phonenumber')
    }else{
        res.json('login success');
        console.log(DataLogin);
        
    }
}catch(err){
console.log(err);

}

app.post('/admi', async (req, res) => {
    try {
        const { username, password } = req.body;
        const dbpass = await Admindetals.findOne({ username });

        if (!dbpass) {
            return res.json('you are not authentic user');
        }

        if (dbpass.password !== password) {
            return res.json('Incorrect password');
        } else {
            res.json('access');
            console.log(dbpass);
        }
    } catch (err) {
        console.log(err);
    }
});
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});