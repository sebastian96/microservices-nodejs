import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default ({postId}) => {
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);  
        setComments(res.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const renderComments = () => {
        if(comments.length > 0) {
            return comments.map((comment, i) => {
                return (
                    <li key={comment.id} className="list-group-item">{i + 1}. {comment.content}</li>
                );
            });
        }

        return <li className="list-group-item">not yet comments</li>
    }

    return (
        <>
            <button type="button" className="btn btn-dark btn-sm d-block float-end">
                Comments <span className="badge bg-primary">{comments.length}</span>
                <span className="visually-hidden">unread messages</span>
            </button>
            <ul className="d-block list-group mt-5">
                {renderComments()}
            </ul>
        </>
    );
};