import React from 'react';
import Avatar from './Avatar';
import { useFirestore } from '../hooks/useFireStore';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProjectSummery({ project }) {
  const { deleteDocument } = useFirestore('projects');
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <div className='project-summary'>
        <h2 className='page-title'>{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className='due-date'>Project due by {new Date(project.dueDate.seconds * 1000).toDateString()}</p>
        <p className='details'>{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className='assigned-users'>
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button
          className='btn'
          onClick={() => {
            deleteDocument(project.id);
            navigate('/');
          }}
        >
          Mark as completed
        </button>
      )}
    </div>
  );
}
