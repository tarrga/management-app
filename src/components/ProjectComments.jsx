import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFirestore } from '../hooks/useFireStore';
import Avatar from './Avatar';

export default function ProjectComments({ project }) {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();
  const { updateDocument, response } = useFirestore('projects');
  // console.log(projectComments.comment);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentToAdd = {
      dispalyName: user.displayName,
      potoURL: user.photoURL,
      content: newComment,
      createdAt: { seconds: Math.floor(Date.now() / 1000), miliseconds: 0 },
      id: Math.random(),
    };
    await updateDocument(project.id, [...project.comment, commentToAdd]);
    if (!response.error) {
      setNewComment('');
    }
  };

  return (
    <div className='project-comments'>
      <h4>Project comments</h4>

      <ul>
        {project?.comment.length > 0 &&
          project.comment.map((comment) => (
            <li key={comment.id}>
              <div className='comment-author'>
                <Avatar src={comment.potoURL} />
                <p>{comment.desplayName}</p>
              </div>
              <div className='comment-date'>
                <p>{`${new Date(comment.createdAt.seconds * 1000).getDate()}/${
                  new Date(comment.createdAt.seconds * 1000).getMonth() + 1
                }/${new Date(comment.createdAt.seconds * 1000).getFullYear()}
                 ${new Date(comment.createdAt.seconds * 1000).getHours()}:${new Date(
                  comment.createdAt.seconds * 1000
                ).getMinutes()}:${new Date(comment.createdAt.seconds * 1000).getSeconds()}`}</p>
              </div>
              <div className='comment-content'>{comment.content}</div>
            </li>
          ))}
      </ul>

      <form className='add-comment' onSubmit={handleSubmit}>
        <label>
          <span>Add new comment</span>
          <textarea required onChange={(e) => setNewComment(e.target.value)} value={newComment} />
        </label>
        <button className='btn'>Add comment</button>
      </form>
    </div>
  );
}
