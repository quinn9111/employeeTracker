INSERT INTO departments (dept_name)
VALUES
('IT'),
('Sales'),
('Management');

INSERT INTO roles (title, department_id, salary)
VALUES
('IT Support', 1, 54000),
('Sales Rep', 2, 80000),
('Manager', 3, 100000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Abby', 'Alvarez', 3, 1),
('Flacko', 'Alvarez', 1, 1), 
('Harley', 'Quinn', 2, 1);