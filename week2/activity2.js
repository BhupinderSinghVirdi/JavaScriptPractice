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
    json_data = data.toString();
});

// sync way to display

let myData = fs.readFileSync('MOCK_DATA.json');
json_data = JSON.parse(myData);

const server = http.createServer((req, res) => {

 res.statusCode = 200;

 res.setHeader('Content-Type', 'text/plain');

 res.end(json_data);

});

server.listen(port, hostname, () => {

 console.log(`Server running at http://${hostname}:${port}/`);

});
