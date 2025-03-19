CREATE TABLE evaluation (
    id integer NOT NULL,
    comment character varying(1000) NOT NULL,
    evaluation_id integer
);
CREATE TABLE evaluation_result (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);
CREATE TABLE evaluation_type (
    id integer NOT NULL,
    evaluation_id integer NOT NULL,
    type_eval integer NOT NULL
);
CREATE TABLE evaluation_type_list (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);
CREATE TABLE evaluation_user (
    id integer NOT NULL,
    user_id integer NOT NULL,
    module_promotion_id integer NOT NULL,
    result_id integer NOT NULL,
    commentary character varying(255)
);
CREATE TABLE module (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    training_id integer,
    commentary text
);
CREATE TABLE module_evaluation_type (
    id integer NOT NULL,
    module_id integer NOT NULL,
    evaluation_type_id integer NOT NULL
);
CREATE TABLE module_promotion (
    id integer NOT NULL,
    trainer_id integer,
    promotion_id integer NOT NULL,
    module_id integer NOT NULL,
    evaluation_id integer,
    start_date timestamp with time zone,
    end_date timestamp with time zone
);
CREATE TABLE promotion (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    training_id integer,
    start_date timestamp with time zone,
    end_date timestamp with time zone
);
CREATE TABLE role (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);
CREATE TABLE studients_promotion (
    studient_id integer NOT NULL,
    promotion_id integer NOT NULL
);
CREATE TABLE supervisors_promotion (
    id integer NOT NULL,
    supervisor_id integer NOT NULL,
    promotion_id integer NOT NULL
);
CREATE TABLE trainers_promotion (
    id integer NOT NULL,
    trainer_id integer NOT NULL,
    promotion_id integer NOT NULL
);
CREATE TABLE training (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL
);
CREATE TABLE "user" (
    id integer NOT NULL,
    lastname character varying(255) NOT NULL,
    firstname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    birthdate timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    role_id integer,
    "position" character varying(255),
    reset_password_token character varying(255),
    reset_password_expires timestamp with time zone,
    photo character varying(255)
);
