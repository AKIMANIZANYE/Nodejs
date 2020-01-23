const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
  
// default route
app.get('/',(req, res) => {
     res.send('hello' )
});
// connection configurations
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moniRemit'
});
  
// connect to database
dbConn.connect(); 
 
 
// Retrieve all transactions 
app.get('/transaction',  (req, res)=> {
    dbConn.query('SELECT * FROM transaction', (error, results, fields) => {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'transaction list.' });
    });
});
 
 
// Retrieve transaction with id 
app.get('/transaction/:id',(req, res)=> {
  
    let transaction_id = req.params.id;
  
    if (!transaction_id) {
        return res.status(400).send({ error: true, message: 'Please provide transaction_id' });
    }
  
    dbConn.query('SELECT * FROM transactions where id=?', transaction_id, (error, results, fields)=> {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'transaction list.' });
    });
  
});
 
 
// Add a new transaction  
app.post('/transaction',(req, res) =>{
  
    let transaction = req.body.transaction;
  
    if (!transaction) {
        return res.status(400).send({ error:true, message: 'Please provide ' });
    }
  
    dbConn.query("INSERT INTO transaction SET ? ", { transaction: transaction }, (error, results, fields) => {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New transaction has been created successfully.' });
    });
});
 
 

 

 
// set port
app.listen(3000,() => {console.log('starting server');
});
 
module.exports = app;
