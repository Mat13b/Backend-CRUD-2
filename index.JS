const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const app = express();
const item = require('./Data');
const argon2 = require('argon2');

// const hashedPassword = (req, res, next) => {
//     argon2.hash(req.body.password)
//     .then(hashedPassword => {
//         req.hashedPassword = hashedPassword;
//         next();
//     })
//     .catch(err => {
//         res.status(500).json({ error: err.message });
//     });
// }

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    console.log(req.body);
    argon2.hash(req.body.password)
        .then(hashedPassword => {
            res.status(200).json({ hashedPassword });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

app.get('/', (req, res) => {
    res.send('Bonjour tout le monde!');
});

app.get('/item', (req, res) => {
    res.json(item);
});

app.post('/item', (req, res) => {
    const newItem = req.body;
    item.push(newItem);
    res.json(newItem);
});

app.put('/item/:id', (req, res) => {
    const id = req.params.id;
    item[id] = req.body;
    res.json(item[id]);
});

app.delete('/item/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = item.findIndex(item => item.id === id);

    if (index !== -1) {
        item.splice(index, 1);
        res.status(200).json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
