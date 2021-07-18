import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CommentsCreate from './CommentsCreate';
import CommentList from './CommentList';

export default () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');        
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderPosts = Object.values(posts).map(post => {
        return (
            <div className="col-12 col-sm-6" key={post.id}>
                <div className="card mb-2">
                    <div className="card-header text-center bg-primary">
                        <h4>{post.title}</h4>
                    </div>
                    <div className="card-body">
                        <CommentList comments={post.comments}/>
                    </div>
                    <div className="card-footer text-center text-muted">
                        <CommentsCreate postId={post.id}/>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <section className="row">
            {renderPosts}
        </section>
    );
};