INSERT INTO department (department_name) VALUES
('Sales'),
('Marketing'),
('Finance'),
('Human Resources');

INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 70000.00, 1),
('Sales Representative', 50000.00, 1),
('Marketing Manager', 65000.00, 2),
('Marketing Coordinator', 45000.00, 2),
('Financial Analyst', 60000.00, 3),
('Accountant', 55000.00, 3),
('HR Manager', 68000.00, 4),
('HR Assistant', 40000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Michael', 'Johnson', 3, 1),
('Emily', 'Williams', 4, 2),
('David', 'Brown', 5, 3),
('Sarah', 'Taylor', 6, 3),
('Thomas', 'Miller', 7, 4),
('Olivia', 'Anderson', 8, 4);

