CREATE TABLE employee 
(id INT PRIMARY KEY, 
first_name VARCHAR(30), 
last_name VARCHAR(30), 
role_id INT, 
manager_id INT,
FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE roles 
(id INT PRIMARY KEY, 
title VARCHAR(30), 
salary DECIMAL, 
department_id INT,
FOREIGN KEY (department_id) REFERENCES department(id));

CREATE TABLE department 
(id INT PRIMARY KEY, 
name VARCHAR(30));