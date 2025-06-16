-- schema.sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  service ENUM('wash', 'dryclean'),
  drop_off_date DATE,
  pick_up_date DATE,
  status ENUM('pending', 'in_progress', 'completed'),
  total_price DOUBLE,
  booking_date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,                
  description TEXT,                        
  price DOUBLE NOT NULL,                   
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);