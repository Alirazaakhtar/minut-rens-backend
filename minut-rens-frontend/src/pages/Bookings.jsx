import { useEffect, useState } from 'react';
import axios from '../services/api';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings')
      .then(res => setBookings(res.data))
      .catch(() => alert("Kun adgang med login"));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dine bookinger</h2>

      {bookings.length === 0 ? (
        <div className="alert alert-info">Du har ingen bookinger endnu.</div>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <p><strong>Service:</strong> {b.service_name}</p>
              <p><strong>Afleveringsdato:</strong> {b.drop_off_date.slice(0,10)}</p>
              <p><strong>Afhentningsdato:</strong> {b.pick_up_date.slice(0,10)}</p>
              <p><strong>Status:</strong> {b.status}</p>
              <p><strong>Pris:</strong> {b.total_price} kr.</p>
              <p><strong>Booket:</strong> {b.booking_date.slice(0,10)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookings;