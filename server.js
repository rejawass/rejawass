const bodyParser=require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const express=require('express')
const app=express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.post('/insert',(req,res)=>{
  MongoClient.connect(url,(err, db)=> {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myObj=req.body;
    dbo.collection("employees").insertMany(myObj,(err, result)=> {
      if (err) throw err;
      res.send(result);

    });
  });
 
});
app.get('/find',(req,res)=>{
  MongoClient.connect(url,(err,db)=>{
    if(err)throw err;
    var dbo=db.db('mydb');
    dbo.collection("employees").find({},{projection:{Name: 1,_id: 0,Designation: 1}}).toArray((err,result)=>{
      if(err)throw err;
      res.send(result);
    });
  }); 
});

app.post('/query',(req,res)=>{
  MongoClient.connect(url,(err,db)=>{
    if(err)throw err;
    var dbo=db.db('mydb');
     var query=req.body;  
    dbo.collection("employees").find(query).toArray((err,result)=>{
      if(err)throw err;
      res.send(result);
    });
  }); 
});
app.post('/sort',(req,res)=>{
  MongoClient.connect(url,(err,db)=>{
    if(err)throw err;
    var dbo=db.db('mydb');
    var mySort=req.body;
    dbo.collection("employees").find().sort(mySort).limit(5).toArray((err,result)=>{
       if(err)throw err;
       res.send(result);
    });
  });
});


app.listen(8001,()=>{
  console.log('Server is running at 8001');
})

