CREATE DATABASE livret;

USE livret;

CREATE TABLE role(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50) NOT NULL
);

INSERT INTO role(id, name) VALUES
(1, 'apprenant'), (2, 'Formateur'), (3, 'Admin');

SET SQL_SAFE_UPDATES = 0;
UPDATE role SET name = 'Apprenant' WHERE name = 'apprenant';
SET SQL_SAFE_UPDATES = 1;

SELECT * FROM role;

CREATE TABLE user (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(50) NOT NULL,
surname VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
promo VARCHAR(50) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
role_id INT,
company VARCHAR(50) NOT NULL,
FOREIGN KEY (role_id) REFERENCES role(id)
);

SELECT * FROM user;

INSERT INTO user(id, first_name, surname, email, promo, created_at, updated_at, role_id, company) VALUES
(1, 'Xavier', 'Barthez', 'xavierbarthez@gmail.com', 2025, '2025-07-24', '2025-07-24', 1, 'ISEG'),
(2, 'Paul', 'Langevin', 'paullangevin@gmail.com', 2025, '2025-07-24', '2025-07-24', 2, 'Foreach'),
(3, 'Laury', 'Bossaert', 'laurybossaert@gmail.com', 2025, '2025-07-24', '2025-07-24', 3, 'Foreach');

ALTER TABLE user ADD COLUMN password VARCHAR(50) NOT NULL;
ALTER TABLE user MODIFY COLUMN password VARCHAR(100);

INSERT INTO user( first_name, surname, email, password, promo, created_at, updated_at, role_id, company) VALUES
('Laury', 'Bossaert', 'laurybossaert2@gmail.com', "azerty", 2025, '2025-07-24', '2025-07-24', 3, 'Foreach');

INSERT INTO user( first_name, surname, email, password, promo, created_at, updated_at, role_id, company) VALUES
('Brandon', 'Bossaert', 'brandon@gmail.com', "azertyghhes", 2025, '2025-07-24', '2025-07-24', 3, 'Foreach');
 
 DELETE FROM user WHERE id =13;


CREATE TABLE module(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(50) NOT NUll,
end_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
user_id INT,
commentary TEXT,
FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE formation(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(50) NOT NULL,
user_id INT,
FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE formation_module (
formation_id INT,
module_id INT,
FOREIGN KEY (formation_id) REFERENCES formation(id),
FOREIGN KEY (module_id) REFERENCES module(id)
);

CREATE TABLE evaluation_type(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50)
);

CREATE TABLE evaluation(
 id INT AUTO_INCREMENT PRIMARY KEY,
 module_id INT,
 user_id INT,
 evaluation_type_id INT,
 FOREIGN KEY(module_id) REFERENCES module(id),
 FOREIGN KEY (user_id) REFERENCES user(id),
 FOREIGN KEY (evaluation_type_id) REFERENCES evaluation_type (id)
 );

CREATE TABLE mark(
user_id INT,
module_id INT,
evaluation_id INT,
result ENUM ('Acquis', 'En cours', 'Non acquis'),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES user(id),
FOREIGN KEY (module_id) REFERENCES module(id),
FOREIGN KEY (evaluation_id) REFERENCES evaluation(id)
);