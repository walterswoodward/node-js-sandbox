const fs = require('fs');

const requestHandler = (req,res) => {
    const url = req.url
    if (url === '/') {
        fs.readFile('hello.html',function(err,data){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end();
          });
    }
    if (url === '/users') {
        fs.readFile('users.html',function(err,data){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end();
        });
    }
}

module.exports =  {
    handler: requestHandler
};