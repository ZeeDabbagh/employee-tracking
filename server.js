const mysql = require('mysql12')
const inquirer = require('inquirer')
const dotenv = require('dotenv')

dotenv.config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`You're connected`);
    questionsMenu();
});

const questionsMenu = () => {
    inquirer
        .createPromptModule([
            {
                type:'list',
                name:"action",
                message:`What would you like to do?`,
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update and employee role",
                    "Quit"
                ]

            }
        ])
        // .then(response) => {

        // }
}