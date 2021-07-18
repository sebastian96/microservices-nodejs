const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const posts = {};

const handleEvent = (type, data) => {
    if(type === 'postCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
    }

    if(type === 'commentCreated') {
        const {id, content, postId, status} = data;
        const comments = posts[postId].comments;

        comments.push({id, content, status});
    }
    if(type === 'commentUpdated') {
        const {postId, id, status, content} = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => comment.id === id);

        comment.status = status;
        comment.content = content;
    }
}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const {type, data} = req.body;

    handleEvent(type, data);
    
    res.send({});
});

app.listen(4002, async () => {
    console.log('Listening on 4002');

    const res = await axios.get('http://localhost:4005/events');

    for(let event of res.data) {
        handleEvent(event.type, event.data)
    }
})