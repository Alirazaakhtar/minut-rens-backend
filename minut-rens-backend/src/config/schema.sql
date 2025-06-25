-- schema.sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255).
  role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  service_id INT NOT NULL,
  drop_off_date DATE,
  pick_up_date DATE,
  status ENUM('modtaget', 'i gang', 'klar til afhentning'),
  total_price DOUBLE,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (service_id) REFERENCES services(id)
);

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,                
  description TEXT,                        
  price DOUBLE NOT NULL,                   
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);