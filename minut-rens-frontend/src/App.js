import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Bookings from './pages/Bookings';
import CreateBooking from './pages/CreateBooking';
import PrivateRoute from './components/middleware/PrivateRoute';
import Navbar from './components/Navbar';
import AdminRoute from './components/middleware/AdminRoute';
import AdminPage from './pages/admin/AllBookings';
import Services from './pages/ServicePage';
import Register from './pages/Register';
import EditBooking from './pages/admin/EditBooking';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />

        <Route path="bookings/admin/" element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
          } 
        />

        <Route path="/bookings/admin/:id" element={<EditBooking />} />

        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <Bookings />
            </PrivateRoute>
          }
        />

        <Route 
          path="/book" 
          element={
            <PrivateRoute>
              <CreateBooking />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;