const express = require('express');
const {randomBytes} = require('crypto')
const cors = require('cors');

const app = express();
const posts = {};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/posts', (req, res) => res.send(posts))

app.post('/posts', (req, res) => {
    const {title} = req.body;
    const id = randomBytes(4).toString('hex');

    if(title.length > 4) {
        posts[id] = {id, title};
        return res.status(201).send(posts[id]);
    }

    return res.status(400).send({error: "title is empty or doesn't have enougth characters"});

});

app.listen(4000, () => {
    console.log('Listening on 4000')
})