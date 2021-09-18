// Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const db = require('./db/connection.js');

// Create an array of questions for user input
const promptUser = () => {
    const questions = [
        {
            message:'What would you like to do?', 
            type:'list', 
            name: 'option',
            choices:[
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit"
            ]
        }
    ];
    inquirer
        .prompt(questions)
        .then((res) => {
            console.log(res);
            console.log(questions);
            switch (res.option) {
                case "View all departments": 
                    viewDepartments();
                    break; 
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update an employee role":
                    updateEmployee();
                    break;
                default: console.log ('Exit')
                    exit();
                    break;
            }
        })
};

// View departments
function viewDepartments() {
    const sql = `SELECT * FROM departments`;
    console.log(sql);
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table (rows);
        promptUser()
    });
};

// View roles
function viewRoles() {
    const sql = `SELECT * FROM roles`;
    console.log(sql);
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table (rows);
        promptUser()
    });
};

// View employees
function viewEmployees() {
    const sql = `SELECT 
        employees.first_name, 
        employees.last_name, 
        roles.title, 
        roles.salary,
        employees.manager_id
        FROM employees 
        LEFT JOIN roles ON employees.role_id = roles.id`;

    console.log(sql);
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table (rows);
        promptUser()
    });
};

// Add department
function addDepartment() {
    inquirer
        .prompt([
            {
                message: 'What is the name of the department you want to add?',
                type: 'input',
                name: "department_name"
            }
        ])
    .then(function(res) {
        const department_name = res.department_name;
        console.log(res);
        const sql = `INSERT INTO departments SET ?` // HELP
        db.query(sql, {department_name:res.department_name}, function (err, res) {
            if (err) {
                console.log(err)
            } else {
                console.log(`The department was added`);
                promptUser()
            }
        }); 
    })
};

// Add role
function addRole() {
    inquirer
        .prompt([
            {
                message: 'What is the role you want to add?',
                type: 'input',
                name: "title"
            },
            {
                message: 'What is the salary for this role?',
                type: 'input',
                name: "salary"
            },
            {
                message: 'What is the deparment ID this role belongs to?',
                type: 'input',
                name: "department_id"
            },
        ])
    .then(function(res) {
        const title = res.title;
        console.log(res);
        const salary = res.salary;
        const department_id = res.department_id;
        const sql = `INSERT INTO roles SET ?`
        console.log(salary);
        db.query(sql, {title:res.title, salary:res.salary, department_id:res.department_id}, function (err, res) {
            if (err) {
                console.log(err)
            } else {
                console.log(`The role was added`);
                promptUser()
            }
        }); 
    })
};

// Add an employee
function addEmployee() {
    inquirer
        .prompt([
            {
                message: 'What is the employees first name?',
                type: 'input',
                name: "first_name"
            },
            {
                message: 'What is the employee last name?',
                type: 'input',
                name: "last_name"
            },
            {
                message: 'What is the employees role ID?',
                type: 'input',
                name: "role_id"
            },
            {
                message: 'What is the employees manager ID?',
                type: 'input',
                name: "manager_id"
                //validation to default to null
            }
        ])
    .then(function(res) {
        const first_name = res.first_name;
        console.log(res);
        const last_name = res.last_name;
        const role_id = res.role_id;
        const sql = `INSERT INTO employees SET ?`
        db.query(sql, {first_name:res.first_name, last_name:res.last_name, role_id:res.role_id, manager_id:res.manager_id}, function (err, res) {
            if (err) {
                console.log(err)
            } else {
                console.log(`The employee was added`);
                promptUser()
            }
        }); 
    })
};

// Update an employee's role
function updateEmployee() {
    inquirer
        .prompt([
            {
                message: 'What is the employee ID you want to update?',
                type: 'number',
                name: "employee_id"
            },
            {
                message: 'What is the new role ID of this employee?',
                type: 'number',
                name: "role_id"
            }
        ])
    .then(function(res) {
        const employee_id = res.employee_id;
        console.log(res);
        const role_id = res.role_id;
        const sql = `UPDATE employees SET ? WHERE id = ${employee_id}`
        db.query(sql, {role_id:res.role_id}, function (err, res) {
            if (err) {
                console.log(err)
            } else {
                console.log(`The employee was edited`);
                promptUser()
            }
        }); 
    })
};

// Exit function
function exit() {
    process.exit()
}

// Create a function to initialize app
function init() {
    promptUser()
    // .then(data => writeToFile(generateMarkdown(data)));
};
  
// Function call to initialize app
init();