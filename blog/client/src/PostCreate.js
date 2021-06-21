import React, {useState} from 'react';
import axios from 'axios';

export default () => {
   const [title, setTitle] = useState('');

   const onSubmit = async (e) => {
      e.preventDefault();
      await axios.post('http://localhost:4000/posts', {title});
      setTitle('');
   }

   return (
      <form className="col col-6" onSubmit={onSubmit}>
         <div className="form-group">
            <label className="h4">Title</label>
            <input
               placeholder="Write a title for your post"
               className="form-control" 
               value={title}
               onChange={e => setTitle(e.target.value)}
            />
         </div>
         <button className="btn btn-primary mt-3">Send</button>
      </form>
   );
};