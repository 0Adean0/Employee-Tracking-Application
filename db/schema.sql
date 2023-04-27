DROP DATABASE IF EXISTS corp_db;
CREATE DATABASE corp_db;

USE corp_db
SELECT DATABASE();

CREATE TABLE Department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (30) NOT NULL);
CREATE TABLE Title(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (30) NOT NULL,
    salary INT NOT NULL,
    region INT NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department (id));
CREATE TABLE Employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name  VARCHAR (30) NOT NULL,
    title_id INT,
    FOREIGN KEY (title_id)
    REFERENCES title(id));
