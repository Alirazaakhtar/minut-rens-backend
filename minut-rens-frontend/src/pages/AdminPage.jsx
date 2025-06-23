import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/bookings/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error('Fejl ved hentning af bookinger:', err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container">
      <h2>Alle bookinger</h2>
      {bookings.length === 0 ? (
        <p>Ingen bookinger fundet.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Bruger-ID</th>
              <th>Service</th>
              <th>Aflevering</th>
              <th>Afhentning</th>
              <th>Status</th>
              <th>Pris</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.user_id}</td>
                <td>{b.service_name || b.service_id}</td>
                <td>{new Date(b.drop_off_date).toLocaleDateString()}</td>
                <td>{new Date(b.pick_up_date).toLocaleDateString()}</td>
                <td>{b.status}</td>
                <td>{b.total_price} kr.</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;