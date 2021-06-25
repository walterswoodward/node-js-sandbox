const fs = require('fs');

const requestHandler = (req, res) => {
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
}

module.exports = requestHandler;