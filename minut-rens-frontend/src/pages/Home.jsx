import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

const Home = () => {
  return (
    <div className="container mt-5">

      <div className="card shadow-lg border-0 mb-5">
        <img
          src="https://images.unsplash.com/photo-1549037173-e3b717902c57?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Renseri"
          className="img-fluid rounded-top"
          style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
        />
        <div className="card-body text-center">
          <h1 className="display-5 mb-3">Minut Rens</h1>
          <p className="lead mb-4">
            Hurtig, professionel og pålidelig rensning af tøj og tekstiler.
          </p>
          <Link to="/book" className="btn btn-primary btn-lg">
            Book en service
          </Link>
        </div>
      </div>

      <div className="card shadow-sm border-0 mb-5 p-4">
        <h2 className="mb-3">Åbningstider – København</h2>
        <ul className="list-unstyled">
          <li>Man – Fre: 11:00 – 17:30</li>
          <li>Lørdag: 11:00 – 13:00</li>
          <li>Helligdage: Lukket</li>
        </ul>
      </div>

      <div className="card shadow-sm border-0 p-4">
        <h2 className="mb-3">Kontakt</h2>
        <p>
          <strong>Telefon:</strong> 29 43 43 43<br />
          <strong>Email:</strong> info@minutrens.dk
        </p>
        <p>
          <strong>Adresse:</strong><br />
          Vesterbrogade 41, 1620 København V
        </p>
      </div>
      <ContactForm/>
      <br />
    </div>
  );
};

export default Home;