import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

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

  if (!bookings) {
  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Indlæser...</span>
      </div>
    </div>
  );
}

//søge
const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:8080/bookings/${searchId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      if (res.data) {
        // Gå til redigeringsside direkte
        navigate(`/bookings/admin/${searchId}`);
      }
    } catch (err) {
      alert('Booking ikke fundet');
    }
  };

  return (
    <div className="container">
      <h2>Alle bookinger</h2>

       <form className="mb-4 d-flex" onSubmit={handleSearch}>
        <input
          type="number"
          className="form-control me-2"
          placeholder="Søg booking ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Søg</button>
      </form>

      {bookings.length === 0 ? (
        <p>Ingen bookinger fundet.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Booking-ID</th>
              <th>Service</th>
              <th>Aflevering</th>
              <th>Afhentning</th>
              <th>Status</th>
              <th>Pris</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.service_name || b.service_id}</td>
                <td>{new Date(b.drop_off_date).toLocaleDateString()}</td>
                <td>{new Date(b.pick_up_date).toLocaleDateString()}</td>
                <td>{b.status}</td>
                <td>{b.total_price} kr.</td>
                <td><Link className='btn btn-primary' to={`/bookings/edit/${b.id}`}>Updater</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;