const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url
    if (url === '/') {
        fs.readFile('./views/index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    if (url === '/users') {
        fs.readFile('./views/users.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    if (url === '/create-user' && req.method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log(username + " added!");

            fs.appendFile('users.txt', "\n" + username, (err) => {
                if (!err) {
                    res.statusCode = 302;
                    res.setHeader('Location', '/users'); // redirect to /users
                    console.log('success!');
                    return res.end();
                } else {
                    console.error(err);
                }
            })
        });
    }

}

module.exports = {
    handler: requestHandler
};