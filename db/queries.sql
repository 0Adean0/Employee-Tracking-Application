SELECT title.title AS  `Job Title`,department.name AS `Department`, title.salary AS `Salary`, title.id AS `Title ID`
ROLE title 
LEFT JOIN department
ON title.department_id = department.id
ORDER BY department.name;

SELECT employees.id AS `Employee ID`, employees.first_name AS `First Name`, employees.last_name AS `Last Name`, title.title AS `Job Title`, department.name AS `Department`, title.salary AS `Salary`, employees.manager_id AS `Manager ID`
FROM employees
LEFT JOIN title
ON employees.title_id=title.id
LEFT JOIN department
ON title.department_id = department.id;
INSERT INTO department (name)
VALUES
('Mimic Disposal');