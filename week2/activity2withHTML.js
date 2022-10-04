const http = require('http');
const fs = require('fs')

const hostname = '127.0.0.1';

const port = 3030;

// async way to display

let json_data;
fs.readFile('MOCK_DATA.json', (err,data) => {
    if (err) {
        console.error(err);
        return;
    }
    json_data = data;
});


// sync way to display

let myData = fs.readFileSync('MOCK_DATA.json');
//json_data = JSON.parse(myData.toString);



// rendering data
const server = http.createServer((req, res) => {

 res.statusCode = 200;

 res.setHeader('Content-Type', 'text/html');

 log_data= JSON.parse(json_data);
 res.write(`<h2>this is the name of the first record in the data ${log_data[0].first_name}<h2>`);
 res.end();
c
});

server.listen(port, hostname, () => {

 console.log(`Server running at http://${hostname}:${port}/`);

});

