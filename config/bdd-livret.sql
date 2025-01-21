create database if not exists foreach_livret;

CREATE TABLE
  IF NOT EXISTS role (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE
  );

CREATE TABLE
  IF NOT EXISTS formation (
    id SERIAL PRIMARY KEY, 
    title VARCHAR NOT NULL UNIQUE
  );

CREATE TABLE
  IF NOT EXISTS promotion (
    id SERIAL PRIMARY KEY, 
    title VARCHAR NOT NULL UNIQUE,
    formation_id INTEGER,
    CONSTRAINT fk_formation_promotion FOREIGN KEY (formation_id) REFERENCES formation (id) ON DELETE SET NULL ON UPDATE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS "user" (
    id SERIAL primary key,
    lastname VARCHAR not null,
    firstname VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    birthdate DATE,
    promo VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    role_id INTEGER,
    reset_password_token VARCHAR UNIQUE,
    reset_password_expires TIMESTAMP,
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE SET NULL ON UPDATE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS responsables_promotion (
    id SERIAL PRIMARY KEY,
    responsable_id INTEGER,
    promotion_id INTEGER,
    CONSTRAINT fk_responsables_promotion_responsable FOREIGN KEY (responsable_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_responsables_promotion_promotion FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE SET NULL ON UPDATE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS formateurs_promotion (
    id SERIAL PRIMARY KEY,
    formateur_id INTEGER,
    promotion_id INTEGER,
    CONSTRAINT fk_formateurs_promotion_formateur FOREIGN KEY (formateur_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_formateurs_promotion_promotion FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE SET NULL ON UPDATE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS evaluation_type (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL);

CREATE TABLE
  IF NOT EXISTS evaluation_resultat (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL);

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
  IF NOT EXISTS formation_module (
    start_date TIMESTAMP DEFAULT NOW (),
    end_date TIMESTAMP NOT NULL DEFAULT NOW (),
    formateur_id INTEGER,
    formation_id INTEGER,
    module_id INTEGER,
    CONSTRAINT fk_formation_module_formateur FOREIGN KEY (formateur_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_formation_module_formation FOREIGN KEY (formation_id) REFERENCES formation (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_formation_module_module FOREIGN KEY (module_id) REFERENCES module (id) ON DELETE SET NULL ON UPDATE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS evaluation (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT NOW (),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW (),
    module_id INTEGER,
    apprenant_id INTEGER,
    evaluation_resultat_id INTEGER,
    comment VARCHAR,
    CONSTRAINT fk_evaluation_module FOREIGN KEY (module_id) REFERENCES module (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_evaluation_apprenant FOREIGN KEY (apprenant_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_evaluation_evaluation_resultat FOREIGN KEY (evaluation_resultat_id) REFERENCES evaluation_resultat (id) ON DELETE SET NULL ON UPDATE CASCADE
  );

CREATE TABLE
  IF NOT EXISTS apprenants_promotion (
    apprenant_id INTEGER,
    promotion_id INTEGER NOT NULL,
    CONSTRAINT fk_apprenants_promotion_apprenant FOREIGN KEY (apprenant_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_apprenants_promotion_promotion FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE SET NULL ON UPDATE CASCADE
  );

INSERT INTO role (name) VALUES 
('Admin'),
('Apprenant');

INSERT INTO formation (title) VALUES 
('DWWM'),
('CDA - Première Année');

INSERT INTO promotion (title, formation_id) VALUES 
('DWWM 2024', 1),
('CDA - Première Année 2024', 2);

INSERT INTO "user" (id, firstname, lastname, email, birthdate, promo, created_at, updated_at, role_id, password) VALUES 
(1, 'Alice', 'Smith', 'alice.smith@example.com', '1995-06-15', 'Promo 2025', NOW(), NOW(), 1, 'hashed_password_1'),
(2, 'Bob', 'Johnson', 'bob.johnson@example.com', '1990-09-23', 'Promo 2024', NOW(), NOW(), 2, 'hashed_password_2');

INSERT INTO responsables_promotion (responsable_id, promotion_id) VALUES 
(1, 1),
(1, 2);

INSERT INTO evaluation_type (name) VALUES 
('QCM'),
('Project');

INSERT INTO evaluation_resultat (name) VALUES 
('Reussi'),
('Echec');

INSERT INTO module (title, commentary) VALUES 
('Les Bases du HTML/CSS', 'Introduction au HTML et CSS'),
('JavaScript', 'Focus sur les algorithmes avec JS');

INSERT INTO module_evaluation_type (module_id, evaluation_type_id) VALUES 
(1, 1),
(2, 2);

INSERT INTO formation_module (start_date, end_date, formateur_id, formation_id, module_id) VALUES 
('2025-01-01', '2025-01-07', 1, 1, 1),
('2025-01-15', '2025-01-21', 2, 2, 2);

INSERT INTO evaluation (created_at, updated_at, module_id, apprenant_id, evaluation_resultat_id, comment) VALUES 
(NOW(), NOW(), 1, 2, 1, 'Bon travail en HTML'),
(NOW(), NOW(), 2, 2, 2, 'A besoin de nets améliorations en JS');

INSERT INTO apprenants_promotion (apprenant_id, promotion_id) VALUES 
(2, 1),
(2, 2);

INSERT INTO formateurs_promotion (formateur_id, promotion_id) VALUES 
(2, 1),
(2, 2);