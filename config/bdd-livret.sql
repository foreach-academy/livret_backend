CREATE TABLE IF NOT EXISTS role (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS training (
    id SERIAL PRIMARY KEY, 
    title VARCHAR NOT NULL UNIQUE,
    description VARCHAR NOT NULL,
    url VARCHAR NOT NULL 
);

CREATE TABLE IF NOT EXISTS promotion (
    id SERIAL PRIMARY KEY, 
    title VARCHAR NOT NULL,
    training_id INTEGER,
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    CONSTRAINT fk_training_promotion FOREIGN KEY (training_id) REFERENCES training (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    lastname VARCHAR NOT NULL,
    firstname VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    birthdate DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    role_id INTEGER,
    position VARCHAR NULL,
    reset_password_token VARCHAR UNIQUE,
    reset_password_expires TIMESTAMP,
    photo VARCHAR NULL,
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS supervisors_promotion (
    id SERIAL PRIMARY KEY,
    supervisor_id INTEGER NOT NULL,
    promotion_id INTEGER NOT NULL,
    CONSTRAINT fk_supervisors_promotion_supervisor FOREIGN KEY (supervisor_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_supervisors_promotion_promotion FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS trainers_promotion (
    id SERIAL PRIMARY KEY,
    trainer_id INTEGER NOT NULL,
    promotion_id INTEGER NOT NULL,
    CONSTRAINT fk_trainers_promotion_trainer FOREIGN KEY (trainer_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_trainers_promotion_promotion FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS evaluation_type_list (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS evaluation_result (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS module (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    training_id integer,
    commentary text,
   constraint fk_module_training foreign key (training_id) references training (id) ON DELETE SET NULL ON UPDATE CASCADE
);



CREATE TABLE IF NOT EXISTS evaluation (
    id SERIAL PRIMARY KEY,
    comment VARCHAR NOT NULL
);
CREATE TABLE IF NOT EXISTS module_promotion (
    id SERIAL PRIMARY KEY, 
    trainer_id INTEGER  NULL,
    promotion_id INTEGER NOT NULL,
    module_id INTEGER NOT NULL,
    evaluation_id integer null,
    start_date date null,
    end_date date null,
    CONSTRAINT fk_module_promotion_trainer FOREIGN KEY (trainer_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_module_promotion_promotion FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_module_promotion_module FOREIGN KEY (module_id) REFERENCES module (id) ON DELETE SET NULL ON UPDATE cascade,
    constraint fk_module_promotion_evaluation foreign key (evaluation_id) references evaluation(id) on delete set null on update cascade
);

CREATE TABLE IF NOT EXISTS evaluation_type (
    id SERIAL PRIMARY KEY,
    evaluation_id INTEGER NOT NULL,
    type_eval INTEGER NOT NULL,
    CONSTRAINT fk_evaluation_type FOREIGN KEY (type_eval) REFERENCES evaluation_type_list (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_evaluation FOREIGN KEY (evaluation_id) REFERENCES evaluation (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS evaluation_user (
    id SERIAL PRIMARY KEY, 
    user_id INTEGER NOT NULL, 
    module_promotion_id INTEGER NOT NULL,
    result_id INTEGER NOT NULL,
    commentary VARCHAR NULL,
    CONSTRAINT fk_evaluation_user_user FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_evaluation_user_module_promotion FOREIGN KEY (module_promotion_id) REFERENCES module_promotion (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_evaluation_user_evaluation_result FOREIGN KEY (result_id) REFERENCES evaluation_result (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS studients_promotion (
    id SERIAL PRIMARY KEY,
    studient_id INTEGER NOT NULL,
    promotion_id INTEGER NOT NULL,
    CONSTRAINT fk_studients_promotion_studient FOREIGN KEY (studient_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_studients_promotion_promotion FOREIGN KEY (promotion_id) REFERENCES promotion (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL
    );

CREATE TABLE IF NOT EXISTS tutor (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    position VARCHAR(255) NOT NULL,
    company_id INTEGER NOT NULL,
    CONSTRAINT fk_tutor_user FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_tutor_company FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS apprenticeship (
    id SERIAL PRIMARY KEY,
    student_promotion_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    tutor_id INTEGER NOT NULL,
    commentary TEXT NULL
);



INSERT INTO role (name) VALUES 
('Admin'),
('Formateur'),
('Etudiant'),
('Tuteur');



-- password = admin1
INSERT INTO public."user" (lastname,firstname,email,"password",birthdate,created_at,updated_at,role_id,"position",reset_password_token,reset_password_expires,photo) VALUES
	 ('Wicart','Flore','admin1@test.fr','$2b$10$h5nqDj60OpDhWliJpD8wgOF8nSkj.kWdsbV1y11oB.xQk6JItMHrG','1991-07-07','2025-10-02 00:00:00','2025-10-02 00:00:00',1,NULL,NULL,NULL,NULL),
     ('Bialasik', 'Theo','theo@test.fr','$2b$10$h5nqDj60OpDhWliJpD8wgOF8nSkj.kWdsbV1y11oB.xQk6JItMHrG','1991-07-07','2025-10-02 00:00:00','2025-10-02 00:00:00',2,NULL,NULL,NULL,NULL),
     ('Mullier', 'Karine','karine@test.fr','$2b$10$h5nqDj60OpDhWliJpD8wgOF8nSkj.kWdsbV1y11oB.xQk6JItMHrG','1991-07-07','2025-10-02 00:00:00','2025-10-02 00:00:00',3,NULL,NULL,NULL,NULL)
;

INSERT INTO training (title, description, url) VALUES 
('CDA', 'Concepteur développeur application)', 'https://www.foreach-academy.fr/le-bachelor-foreach/');

INSERT INTO module (title, training_id, commentary) VALUES 
('Javascript', 1, 'Apprendre le Javascript'),
('HTML5', 1, 'Apprendre le HTML5');

INSERT INTO promotion (title, training_id, start_date, end_date) VALUES
('Promotion 2025', 1, '2025-01-01', '2025-12-31');

INSERT INTO studients_promotion (studient_id, promotion_id) VALUES
(3, 1);

INSERT INTO trainers_promotion (trainer_id, promotion_id) VALUES
(2,1);

INSERT INTO supervisors_promotion (supervisor_id, promotion_id  ) VALUES
(1,1);

INSERT INTO module_promotion (trainer_id, promotion_id, module_id, start_date, end_date) VALUES 
(2,1,1,'2025-01-01','2025-03-31'),
(2,1,2,'2025-04-01','2025-05-31');


