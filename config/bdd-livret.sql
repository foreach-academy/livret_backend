CREATE TABLE
  IF NOT EXISTS role (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE
  );

CREATE TABLE
  IF NOT EXISTS training (
    id SERIAL PRIMARY KEY, 
    title VARCHAR NOT NULL UNIQUE,
    description VARCHAR NOT NULL UNIQUE
  );

CREATE TABLE
  IF NOT EXISTS promotion (
    id SERIAL PRIMARY KEY, 
    title VARCHAR NOT NULL UNIQUE,
    training_id INTEGER,
    CONSTRAINT fk_training_promotion FOREIGN KEY (training_id) REFERENCES training (id) ON DELETE SET NULL ON UPDATE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS "user" (
    id SERIAL primary key,
    lastname VARCHAR not null,
    firstname VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    promo VARCHAR NOT NULL,
    birthdate DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    role_id INTEGER,
    job VARCHAR NULL,
    reset_password_token VARCHAR UNIQUE,
    reset_password_expires TIMESTAMP,
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE SET NULL ON UPDATE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS supervisors_promotion (
    id SERIAL PRIMARY KEY,
    supervisor_id INTEGER,
    promotion_id INTEGER,
    CONSTRAINT fk_supervisors_promotion_supervisor FOREIGN KEY (supervisor_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_supervisors_promotion_promotion FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE SET NULL ON UPDATE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS trainers_promotion (
    id SERIAL PRIMARY KEY,
    trainer_id INTEGER,
    promotion_id INTEGER,
    CONSTRAINT fk_trainers_promotion_trainer FOREIGN KEY (trainer_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_trainers_promotion_promotion FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE SET NULL ON UPDATE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS evaluation_type (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL);

CREATE TABLE
  IF NOT EXISTS evaluation_result (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL);

CREATE TABLE
  IF NOT EXISTS module (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    commentary TEXT
  );

CREATE TABLE
  IF NOT EXISTS module_evaluation_type (
    module_id INTEGER,
    evaluation_type_id INTEGER,
    CONSTRAINT fk_module_evaluation_type_module FOREIGN KEY (module_id) REFERENCES module (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_module_evaluation_type_evaluation_type FOREIGN KEY (evaluation_type_id) REFERENCES evaluation_type (id) ON DELETE SET NULL ON UPDATE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS training_module (
    start_date TIMESTAMP DEFAULT NOW (),
    end_date TIMESTAMP NOT NULL DEFAULT NOW (),
    trainer_id INTEGER,
    training_id INTEGER,
    module_id INTEGER,
    CONSTRAINT fk_training_module_trainer FOREIGN KEY (trainer_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_training_module_training FOREIGN KEY (training_id) REFERENCES training (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_training_module_module FOREIGN KEY (module_id) REFERENCES module (id) ON DELETE SET NULL ON UPDATE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS evaluation (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT NOW (),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW (),
    module_id INTEGER,
    studient_id INTEGER,
    evaluation_result_id INTEGER,
    comment VARCHAR,
    CONSTRAINT fk_evaluation_module FOREIGN KEY (module_id) REFERENCES module (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_evaluation_studient FOREIGN KEY (studient_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_evaluation_evaluation_result FOREIGN KEY (evaluation_result_id) REFERENCES evaluation_result (id) ON DELETE SET NULL ON UPDATE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS studients_promotion (
    studient_id INTEGER,
    promotion_id INTEGER NOT NULL,
    CONSTRAINT fk_studients_promotion_studient FOREIGN KEY (studient_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_studients_promotion_promotion FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE SET NULL ON UPDATE CASCADE
  );

INSERT INTO role (name) VALUES 
('Admin'),
('trainer'),
('studient');

INSERT INTO training (title, description) VALUES 
('DWWM',' Developeur Web et Web Mobile'),
('CDA - Première Année', 'Première Année Concepteur Développeur d Applications');

INSERT INTO promotion (title, training_id) VALUES 
('DWWM 2024', 1),
('CDA - Première Année 2024', 2);

-- MDP des utilisateurs : ForEach-Academy1
INSERT INTO "user" (id, firstname, lastname, email, birthdate, promo, created_at, updated_at, role_id, password) VALUES 
(1, 'Flore', 'Wicart', 'flore.wicart@example.com', '1992-06-15', 'Promo 2025', NOW(), NOW(), 1, '$2b$10$.FdNFwHFr7fx4DrAEFFLZ.e5cCBCQfL9cAdUUAJebC5ZMzDR78.Nq'),
(2, 'Bob', 'Johnson', 'bob.johnson@example.com', '1990-09-23', 'Promo 2024', NOW(), NOW(), 2, '$2b$10$.FdNFwHFr7fx4DrAEFFLZ.e5cCBCQfL9cAdUUAJebC5ZMzDR78.Nq'),
(3, 'Thomas', 'Arbley', 'thomas.arbley@example.com', '1995-09-25', 'Promo 2024', NOW(), NOW(), 3, '$2b$10$.FdNFwHFr7fx4DrAEFFLZ.e5cCBCQfL9cAdUUAJebC5ZMzDR78.Nq'),
(4, 'Simon', 'Cimetiere', 'simon.cimetiere@example.com', '1996-11-13', 'Promo 2024', NOW(), NOW(), 3, '$2b$10$.FdNFwHFr7fx4DrAEFFLZ.e5cCBCQfL9cAdUUAJebC5ZMzDR78.Nq');

INSERT INTO supervisors_promotion (supervisor_id, promotion_id) VALUES 
(1, 1),
(1, 2);

INSERT INTO evaluation_type (name) VALUES 
('QCM'),
('Project');

INSERT INTO evaluation_result (name) VALUES 
('Reussi'),
('Echec');

INSERT INTO module (title, commentary) VALUES 
('Les Bases du HTML/CSS', 'Introduction au HTML et CSS'),
('JavaScript', 'Focus sur les algorithmes avec JS');

INSERT INTO module_evaluation_type (module_id, evaluation_type_id) VALUES 
(1, 1),
(2, 2);

INSERT INTO training_module (start_date, end_date, trainer_id, training_id, module_id) VALUES 
('2025-01-01', '2025-01-07', 2, 1, 1),
('2025-01-15', '2025-01-21', 2, 2, 2);

INSERT INTO evaluation (created_at, updated_at, module_id, studient_id, evaluation_result_id, comment) VALUES 
(NOW(), NOW(), 1, 2, 1, 'Bon travail en HTML'),
(NOW(), NOW(), 2, 2, 2, 'A besoin de nets améliorations en JS');

INSERT INTO studients_promotion (studient_id, promotion_id) VALUES 
(3, 1),
(3, 2),
(4, 1),
(4, 2);

INSERT INTO trainers_promotion (trainer_id, promotion_id) VALUES 
(2, 1),
(2, 2);

