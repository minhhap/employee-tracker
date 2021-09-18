INSERT INTO departments (department_name)
VALUES
  ('CEO'),
  ('Finance'),
  ('Engineering'),
  ('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('CEO', 200, 1),
  ('Accountant', 90, 2),
  ('SWE', 120, 3),
  ('Marketing Manager', 85, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Megan', 'Lee', 1, NULL),
  ('Jess', 'Tong', 2, 1),
  ('Jared', 'Jones', 3, 1),
  ('Jane', 'Smitt', 4, 1);