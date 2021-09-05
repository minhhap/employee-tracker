// Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// Create an array of questions for user input
const promptUser = () => {
    return inquirer.prompt(questions)
};

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

// // TODO: Create a function to present data based on user input
// function writeToFile(data) {
//     return new Promise ((resolve, reject) => {
//         fs.writeFile('./readmenew.md', data, err => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve({
//                 return: true,
//             })    
//         }); 
//     }
   
// )};

// TODO: Create a function to initialize app
function init() {
    promptUser()
    // .then(data => writeToFile(generateMarkdown(data)));
};
  

// Function call to initialize app
init();