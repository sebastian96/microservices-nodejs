const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
const commentsByPostId = {};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const postId = req.params.id;
    const comments = commentsByPostId[postId] || [];

    comments.push({id: commentId, content, status: 'pending'});
    commentsByPostId[postId] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'commentCreated',
        data: {
            id: commentId, 
            content,
            postId,
            status: 'pending'
        }
    })

    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    const {type, data} = req.body;

    if(type === 'commentModerated') {
        const {postId, id, status, content} = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => comment.id === id);

        comment.status = status;

        await axios.post('http://localhost:4005/events', {
            type: 'commentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }
    res.send({});
});

app.listen(4001, () => {
    console.log('Listening on 4001')
})