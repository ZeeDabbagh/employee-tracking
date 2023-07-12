const inquirer = require('inquirer')

const viewAllDepts = (connection, questionsMenu) => {
    connection.query("SELECT * FROM department", function(err, result){
        if(!result || err){ throw err }
        console.table(result);
        return questionsMenu()
    })
};

const viewAllRoles = (connection, questionsMenu) => {
    const queryStr = 'SELECT role.id, role.title, role.salary, department.department_name AS department FROM role INNER JOIN department ON role.department_id = department.id'
    connection.query(queryStr, function(err, result){
        if (!result|| err ) { throw err}
        console.table(result)
        return questionsMenu();
    })
};

const viewAllEmployees = (connection, questionsMenu) => {
    const queryStr =  `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`

    connection.query(queryStr, function(err, result) {
        if (!result || err) { throw err }
        console.table(result)
        return questionsMenu()
    })
};

const addDepartment = async (connection, questionsMenu) => {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name:'name',
            message:'Enter the new Department Name:',
        }
    ])

    connection.query('INSERT INTO department SET ?', {department_name: answer.name}, function (err) {
        if (err) {
            throw err
        }
        console.log(`New Departement ${answer.name} added successfully!`)
        return questionsMenu()
    })
};

const addRole = async (connection, questionsMenu) => {
    const departments = await connection.promise().query('SELECT * FROM department');
    const departmentOptions = departments[0].map((department) => ({
        name: department.department_name,
        value: department.id
    }))

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name:'title',
            message:'Enter Role Title:',
        },
        {
            type: 'input',
            name: 'salary',
            message: "Enter role salary:",
        },
        {
            type: 'list',
            name: 'department_id',
            message:"Select a department for this role",
            choices: departmentOptions,
        }
    ])

    connection.query('INSERT INTO role SET ?', answers, function(err) {
        if (err) {throw err}
        console.log(`${answers['title']} role has been created`)
        return questionsMenu();
    })
};

const addEmployee = async (connection, questionsMenu) => {
    const roles = await connection.promise().query('SELECT * FROM role')
    const roleOptions = roles[0].map((role) => ({
        name: role.title,
        value: role.id
    }))

    const managers = await connection.promise().query('SELECT * FROM employee')
    const mgrOptions = managers[0].map((manager) => ({
        name:`${manager.first_name} ${manager.last_name}`,
        value: manager.id
    }))
    mgrOptions.unshift({name: "none", value: null})

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name:'first_name',
            message:'Enter the Employee first name:',
        },
        {
            type: 'input',
            name:'last_name',
            message:'Enter the Employee last name:',
        },
        {
            type: 'list',
            name:'role_id',
            message:'Choose an existing Role from list below',
            choices: roleOptions
        },
        {
            type: 'list',
            name:'manager_id',
            message:'Assign Manager to your new Employee or select none.',
            choices: mgrOptions
        }
    ])

    connection.query('INSERT INTO employee SET ?', answers, function (err) {
        if(err) {throw err}
        console.log(`${answers['first_name']} ${answers['last_name']} added successfully`)
    })
    return questionsMenu()
};

const updateRole = async (connection, questionsMenu) => {
    const employees = await connection.promise().query('SELECT * FROM employee')
    const empOptions = employees[0].map((employee) => ({
        name:`${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }))

    const roles = await connection.promise().query('SELECT * FROM role')
    const roleOptions = roles[0].map((role) => ({
        name:role.title,
        value: role.id
    }))

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name:'employee_id',
            message:"Select an employee you want to modify:",
            choices: empOptions
        },
        {
            type: 'list',
            name:'role_id',
            message:"Update their current role with a different one",
            choices: roleOptions
        }
    ])

    connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.role_id, answers.employee_id], function (err) {
        if (err) {throw err}
        console.log('Employee role updated!')
        return questionsMenu()
    })
};

module.exports = {
    viewAllDepts,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateRole,


}