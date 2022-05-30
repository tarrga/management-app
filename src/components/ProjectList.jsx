import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import './projectList.css';

export default function ProjectList({ projects }) {
  return (
    <div className='project-list'>
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.length !== 0 &&
        projects.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`}>
            <h4>{project.name}</h4>
            <p>Due by {new Date(project.dueDate.seconds * 1000).toDateString()}</p>
            <div className='assigned-to'>
              <ul>
                {project.assignedUsersList.map((user) => (
                  <li key={user.photoURL}>
                    <Avatar src={user.photoURL} />
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
    </div>
  );
}
