const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        // This and the block below are "registering handlers"
        req.on('data', (chunk) => {
            //   console.log(chunk);
            body.push(chunk);
        });
        // This is / operates like an event listener, executing the
        // provided code when the 'end' event is called
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            // Since this is synchronous, it is will block code execution until the operation is done
            // fs.writeFileSync('message.txt', message);
            // This is better! A non-blocking operation
            fs.writeFile('message.txt', message, (err) => {
                if (!err) {
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    console.log('success!');
                    return res.end();      
                } else {
                    console.error(err);
                }
            })
        });
    }
    //   res.setHeader('Content-Type', 'text/html');
    //   res.write('<html>');
    //   res.write('<head><title>My First Page</title><head>');
    //   res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    //   res.write('</html>');
    //   res.end();
});

server.listen(3000);
