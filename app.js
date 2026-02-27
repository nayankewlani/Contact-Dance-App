const express=require('express');
const path=require('path')
const app=express();
const bodyparser=require("body-parser")
const mongoose=require("mongoose")
mongoose.connect(process.env.MONGO_URI);
// mongoose.connect("mongodb+srv://nayankewlani:<password>@nayandevcluster.xznudmv.mongodb.net/?appName=NayanDevCluster");
const port = process.env.PORT || 8000;

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.get('/test', (req, res) => {
    console.log("GET route working");
    res.send("Test route working");
});

app.post('/contact',(req, res)=>{
    console.log("Form Data:", req.body);
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send('this item had been sent to the database')
    }).catch(()=>{
        res.status(404).send('error saving data')
    })
    // res.render('contact.pug');
})

//listen Server
app.listen(port,()=>{
    console.log(`appliction runnig at port${port}`)
})