import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Fejl ved hentning af brugere:', err));
  }, []);

    useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Fejl ved hentning af users:', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2>Alle brugere</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Navn</th>
            <th>Email</th>
            <th>Rolle</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
                <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
