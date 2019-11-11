DROP TABLE IF EXISTS billionaires;
 
CREATE TABLE billionaires (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  email VARCHAR(250) NOT NULL,
  username VARCHAR(250) NOT NULL,
  password VARCHAR(250) DEFAULT NULL
);
 
INSERT INTO billionaires (email, username, password) VALUES
  ('eatmeout@gmail.com', 'pussyMasterXXX', 'Billionaire Industrialist'),
  ('eatmeout@gmail.com', 'Pussy Master slay that ho', 'Billionaire Tech Entrepreneur'),
  ('eatmeout@gmail.com', 'ya mams gae', 'Billionaire Oil Magnate');