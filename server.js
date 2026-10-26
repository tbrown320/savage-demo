const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

let db, collection;

const url = "mongodb+srv://demo:demo@cluster0-q2ojb.mongodb.net/test?retryWrites=true";
const dbName = "demo";

//connecting to the database
app.listen(3000, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs') // eliminates the need to html because the view is through the ejs
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) //built into node so we don't necessarily need it
app.use(express.static('public'))

//read
app.get('/', (req, res) => {
  //find all of the messages and add them to an array
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', { messages: result }) //output of this render is the HTML file
    //render takes the file and spits out the html that was in the file
  })
})

//create
app.post('/messages', (req, res) => {
  console.log(req)
  db.collection('messages').insertOne({ name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown: 0 }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

//update
app.put('/messages', (req, res) => {
  db.collection('messages')
    .findOneAndUpdate({ name: req.body.name, msg: req.body.msg }, {
      $set: {
        thumbUp: req.body.thumbUp + 1
      }
    }, {
      sort: { _id: -1 },
      upsert: true // if the id is new then create it so it doesn't break our function
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})

app.put('/down', (req, res) => {
  db.collection('messages')
    .findOneAndUpdate({ name: req.body.name, msg: req.body.msg }, {
      $set: {
        thumbUp: req.body.thumbUp - 1
      }
    }, {
      sort: { _id: -1 },
      upsert: true // if the id is new then create it so it doesnt break our function
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})

//delete
app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({ name: req.body.name, msg: req.body.msg }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
