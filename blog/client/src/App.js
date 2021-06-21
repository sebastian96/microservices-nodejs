import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

export default () => {
    return (
        <section className="container">
            <div className="row mt-5 mb-5">
                <h2>Create Post</h2>
                <hr />
                <PostCreate />
            </div>
            <div className="row mt-5 mb-5">
                <h2>List Posts</h2>
                <hr />
                <PostList />
            </div>
        </section>
    );
};