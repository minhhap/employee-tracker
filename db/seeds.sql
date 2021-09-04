INSERT INTO departments (id, department_name)
VALUES
  (1, 'Marketing'),
  (2, 'Finance'),
  (3, 'Engineering')
  ;

INSERT INTO roles (title, salary, department_id)
VALUES
  ('SWE', 0.5, 3),
  ('Accountant', 0.3, 2),
  ('Marketing Manager', 0.4, 1);

INSERT INTO employees (first_name, last_name, role_id)
VALUES
  ('Megan', 'Lee', 1),
  ('Jess', 'Tong', 2),
  ('Jared', "Jones", 3);
