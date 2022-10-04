var express = require('express');
var app = express()

app.get('/', function(req,res){
    res.sendFile(__dirname +'/index.html');
});app.get('/api/emps', (req,res) =>{
    res.send([1,2,3])
})

app.get('/api/emps', (req,res) =>{
    res.send([1,2,3])
})

app.get('/api/emps/:id', (req,res) =>{
    res.send(req.params.id)
})

app.get('/api/posts/:month/:day', (req,res) => {
    res.send(req.params.month + req.params.day)
})

app.put('/', function(req,res){
    res.send('Using PUT method!');
});

app.post('/', function(req,res){
    res.send('Using POST method!');
});

app.delete('/', function(req,res){
    res.send('Using DELETE method!');
});

app.all('*', function(req,res){
    res.statusCode(404).send('File Not Found')
});

app.listen(3000, function(){
    console.log('Example app listening on port 3000!');
});