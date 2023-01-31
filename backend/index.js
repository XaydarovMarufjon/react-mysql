import express  from "express";
import mysql  from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"current password",
  database:"tests"
})

app.get('/', (req , res )=>{
  res.json("Hello this a get req")
})

app.get('/books', (req , res )=>{
  const q = "SELECT * FROM books" 
  db.query(q, (err , data)=>{
    if(err) return res.json(err);
    return res.json(data)
  })
})

app.post('/books' , (req , res)=>{
  const q = "INSERT INTO books (`title` , `desc`,`cover` , `price`) VALUES (?)"
 
  const values = [ 
    req.body.title ,
    req.body.desc ,
    req.body.cover,
    req.body.price
  ]
 
  db.query(q,  [values], (err , data)=>{
    if(err) return res.json(err);
    return res.json("Book has benn created succesfully")
  })
}) 

app.delete("/books/:id" , (req , res)=>{
  const bookId = req.params.id;

  const q = "DELETE FROM books WHERE id = ?";

  db.query(q,  [bookId], (err , data)=>{
    if(err) return res.json(err);
    return res.json("Book has benn deleted succesfully")
  })
})

app.put("/books/:id" , (req , res)=>{
  const bookId = req.params.id;

  const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
 
  const values = [ 
    req.body.title ,
    req.body.desc ,
    req.body.cover,
    req.body.price
  ]
 

  db.query(q,  [...values, bookId], (err , data)=>{
    if(err) return res.json(err);
    return res.json("Book has benn updated succesfully")
  })
})

app.listen(3001 , ()=>{
  console.log("connected to back end");
})