import React, {useState} from 'react';
import axios from 'axios';

export default ({postId}) => {
    const [content, setContent] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {content});
        setContent('');
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label className="mb-2">New comment</label>
                <input 
                    placeholder="write your comment"
                    className="form-control mb-2"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
            </div>
            <button className="btn btn-primary">Send</button>
        </form>
    );
};