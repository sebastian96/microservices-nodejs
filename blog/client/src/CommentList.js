import React from 'react';

export default ({comments}) => {
    const renderComments = () => {
        if(comments.length > 0) {
            return comments.map((comment, i) => {
                switch(comment.status) {
                    case 'approved':
                        return (
                            <li key={comment.id} className="list-group-item"><b>{i + 1}.</b> {comment.content}</li>
                        );
                    case 'rejected': 
                        return (
                            <li key={comment.id} className="list-group-item text-danger"><b>{i + 1}.</b> The comment was rejected</li>
                        );    
                    case 'pending': 
                        return (
                            <li key={comment.id} className="list-group-item text-warning"><b>{i + 1}.</b> The comment is waiting moderation</li>
                        );  
                }
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