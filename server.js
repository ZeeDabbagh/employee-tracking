const mysql = require('mysql2')
const inquirer = require('inquirer')
const dotenv = require('dotenv')

dotenv.config();

const {
    viewAllDepts,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
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
        .prompt([
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
                return  viewAllDepts(connection, questionsMenu)
                break
                case'View all roles':
                return   viewAllRoles(connection, questionsMenu)
                break
                case'View all employees':
                return     viewAllEmployees(connection, questionsMenu)
                break
                case"Add a department":
                return addDepartment(connection, questionsMenu)
                break
                case"Add a role":
                return      addRole(connection, questionsMenu)
                break
                case"Add an employee":
                return       addEmployee(connection, questionsMenu)
                break
                case"Update and employee's role":
                updateRole(connection, questionsMenu)
                break
                case "Exit":
                console.log("Goodbye!")
                process.exit()
                
        }})
        
}