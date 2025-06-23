import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <div className="card shadow-lg p-4 border-0">
        <img
          src="https://images.unsplash.com/photo-1549037173-e3b717902c57?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Renseri"
          className="img-fluid rounded mb-4"
          style={{ maxHeight: '300px', objectFit: 'cover' }}
        />
        <h1 className="display-5 mb-3">Minut Rens</h1>
        <p className="lead mb-4">
          Hurtig, professionel og pålidelig rensning af tøj og tekstiler.
        </p>
        <Link to="/book" className="btn btn-primary btn-lg">
          Book en service
        </Link>
      </div>
    </div>
  );
};

export default Home;