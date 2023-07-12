const mysql = require('mysql12')
const inquirer = require('inquirer')
const dotenv = require('dotenv')

dotenv.config();

const {
    viewAllDepts,
    viewAllRoles,
    viewAllEmployees,
    addDeptarmt,
    addRole,
    addEmployee,
    updateRole,
} = require('./utils/cli-logic')

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
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
        .then((responses) => {
            switch(responses["action"]){
                case'View all departments':
                return  viewAllDepts()
                break
                case'View all roles':
                return   viewAllRoles()
                break
                case'View all employees':
                return     viewAllEmployees()
                break
                case"Add a department":
                return addDeptarmt()
                break
                case"Add a role":
                return      addRole()
                break
                case"Add an employee":
                return       addEmployee()
                break
                case"Update and employee's role":
                updateRole()
                break
                case "Exit":
                connection.end()
                console.log("Goodbye!")
        }})
        
}