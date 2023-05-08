DROP DATABASE IF EXISTS corp_db;
CREATE DATABASE corp_db;

USE corp_db;
SELECT DATABASE();

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (30) NOT NULL);
CREATE TABLE title(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (30) NOT NULL,
    salary INT NOT NULL,
    department_id INT,
    FOREIGN KEY (Department_id)
    REFERENCES Department(id)
    ON DELETE SET NULL);
CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name  VARCHAR (30) NOT NULL,
    title_id INT,
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES Employees(id)
    ON DELETE SET NULL,
    FOREIGN KEY (Title_id)
    REFERENCES Title(id)
    ON DELETE SET NULL
);