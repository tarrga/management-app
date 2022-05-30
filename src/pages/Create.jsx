import { useEffect, useState } from 'react';
import './create.css';
import { useFirestore } from '../hooks/useFireStore';
import Select from 'react-select';
import { useCollection } from '../hooks/useCollection';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

export default function Create() {
  const { documents } = useCollection('users');
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  const navigate = useNavigate();

  const { addDocument, response } = useFirestore('projects');

  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!category) {
      setError('Please select a project category');
      return;
    }
    if (assignedUsers.length < 1) {
      setError('Please assign the project to at least 1 user');
      return;
    }
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      dueDate: { seconds: Math.floor(new Date(dueDate).getTime() / 1000), nanoseconds: 0 },
      comment: [],
      createdBy,
      assignedUsersList,
    };
    console.log(project);
    await addDocument(project);
    if (!response.error) {
      navigate('/');
    }
  };
  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input type='text' required onChange={(e) => setName(e.target.value)} value={name} />
        </label>
        <label>
          <span>Project details:</span>
          <textarea type='text' required onChange={(e) => setDetails(e.target.value)} value={details} />
        </label>
        <label>
          <span>Set due date:</span>
          <input type='date' required onChange={(e) => setDueDate(e.target.value)} value={dueDate} />
        </label>
        <label>
          <span>Project category:</span>
          <Select onChange={(option) => setCategory(option)} options={categories} />
        </label>
        <label>
          <span>Assign to:</span>
          <Select onChange={(option) => setAssignedUsers(option)} options={users} isMulti />
        </label>
        <button className='btn'>Add project</button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
}
