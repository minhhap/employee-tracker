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
                "Add a role",
                "Add an employee",
                "Add a department",
                "Update an employee role",
                "Quit"
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
                case "Add a role":
                    addRole();
                    break;
                default: return
            }
        })
};

function viewDepartments() {
    const sql = `SELECT * FROM departments`;
    console.log(sql);
    db.query(sql, (err, rows) => {
        if (err) {
            console.log("Error")
        }
        console.table (
            rows)
    });
};

function viewRoles() {
    const sql = `SELECT * FROM roles`;
    console.log(sql);
    db.query(sql, (err, rows) => {
        if (err) {
            console.log("Error")
        }
        console.table (
            rows)
    });
};

function viewEmployees() {
    const sql = `SELECT 
        employees.first_name, 
        employees.last_name, 
        roles.title, 
        roles.salary
        FROM employees 
        LEFT JOIN roles ON employees.role_id = roles.id`;

    console.log(sql);
    db.query(sql, (err, rows) => {
        if (err) {
            console.log("Error")
        }
        console.table (
            rows)
    });
};

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
        const salary = res.salary;
        const department_id = res.department_id;
        const sql = 'INSERT INTO roles (title, salary, department_id) VALUE("${title}", "${salary}", "${department_id}")';
    
        db.query(sql, function (err, res) {
            if (err) {
                console.log("Error")
            } else {
                res({
                    changes: result.affectedRows
                })
            }
        }); 
    })
};


// Create a function to initialize app
function init() {
    promptUser()
    // .then(data => writeToFile(generateMarkdown(data)));
};
  

// Function call to initialize app
init();