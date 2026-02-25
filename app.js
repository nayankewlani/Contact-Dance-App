const express=require('express');
const path=require('path')
const app=express();
const bodyparser=require("body-parser")
const mongoose=require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const port=8000;

//define mongoose schema
const contacSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const contact = mongoose.model('Contact', contacSchema);

//Express
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//EndPoint
app.get('/',(req, res)=>{
    const params={}
    res.render('home.pug',params);
})
app.get('/contact',(req, res)=>{
    const params={}
    res.render('contact.pug',params);
})

app.post('/contact',(req, res)=>{
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send('this item had been sent to the database')
    }).catch(()=>{
        res.status(404).send('item was not saved')
    })
    // res.render('contact.pug');
})

//listen Server
app.listen(port,()=>{
    console.log(`appliction runnig at port${port}`)
})