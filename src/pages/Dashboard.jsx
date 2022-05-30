import React from 'react';
import ProjectFilter from '../components/ProjectFilter';
import ProjectList from '../components/ProjectList';
import { useCollection } from '../hooks/useCollection';
import './dashboard.css';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const { documents, error } = useCollection('projects');
  const { user } = useAuth();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const filteredProjects = documents
    ? documents.filter((project) => {
        switch (currentFilter) {
          case 'all':
            return true;
          case 'mine':
            let assignedToMe = false;
            project.assignedUsersList.forEach((u) => {
              if (user.uid === u.id) {
                assignedToMe = true;
                return;
              }
            });
            return assignedToMe;
          case 'development':
          case 'design':
          case 'marketing':
          case 'sales':
            return project.category === currentFilter;
          default:
            return true;
        }
      })
    : null;
  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
      {filteredProjects && <ProjectList projects={filteredProjects} />}
    </div>
  );
}
