const inquirer = require("inquirer")
const mysql = require("mysql2")
const table = require("console.table")
// const {engageAllDepartments, engageAllTitles, engageAllEmployees, engageAddDepartment, engageAddTitle, engageAddEmployee, engageUpdateEmployee } = require('./queries')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Imfreezingmynutsoff**",
    database: "corp_db"
},
console.log(`Linked to corp_db database.`))

const init = () => {
    
    return inquirer.prompt([{
        type: "list",
        message: "User's desired action?",
        name: "action_items",
        choices: ["engageAllDepartments","engageAllTitles","engageAllEmployees","engageAddDepartment","engageAddTitle","engageAddEmployee","engageUpdateEmployee"]

    }])}
    init()
    .then((response) => {
        const {action_items} = response
        switch (action_items) {
            case ("engageAllDepartments"):
                db.query("SELECT * FROM department", function(err, result) {
                    if (err){
                        console.log(err)
                    }
                    console.log(result)
                    return result
                })
            break
            case ("engageAllTitles"):
                db.query('SELECT title.title AS `Job Title`, title.salary AS `Posted Salary`, title.id AS `Title ID`, department.name AS `Department` FROM title LEFT JOIN department ON title.department_id = department.id ORDER BY department.name;', (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    console.table(result)
                    return result
                })
            break
            case ("engageAllEmployees"):
                db.query('SELECT employees.id AS `Employee ID`, employees.first_name AS `First Name`, employees.last_name AS `Last Name`, title.title AS `Job Title`, title.salary AS `Posted Salary`, department.name AS `Department`, CONCAT(manager.first_name, manager.last_name)AS `Manager` FROM employees LEFT JOIN title ON employees.title_id = title.id LEFT JOIN department ON title.department_id = department.id LEFT JOIN employees manager ON manager.id = employees.manager_id;', (err, result) => {
                    if (err) {
                        throw err
                    }
                    console.table(result)
                    return result
                })
            break
            case ("engageAddDepartment"):
                inquirer.prompt([{
                    type: "Input",
                    message: "Which department would you like to add to the corporation?",
                    name: "NewDepartment"
                }])
                    .then((response) => {
                        const { NewDepartment } = response
                        db.query(`INSERT INTO department(name)VALUES
                ("${NewDepartment}");`, (err, result) => {
                            if (err) {
                                throw err
                            }
                            console.log(`Added ${NewDepartment}!`)
                        })
                    })
            break
            case ("engageAddTitle"):
                const depArr = () => {
                    return new Promise((resolve, reject) => {
                        db.query(`SELECT * FROM department`, (err, result) => {
                            if (err) {
                                reject(err)
                            } else {
                                const resArr = result.map(department => `${department.name}`)
                                resolve(resArr)
                            }
                        })
                    })
                } 
                inquirer.prompt([{
                    type: "Input",
                    message: "What is the job title?",
                    name: "Title"
                },
                {
                    type: "Input",
                    message: "What is the salary?",
                    name: "Salary"
                },
                {
                    type: "List",
                    message: "What department does the title serve?",
                    name: "Department",
                    choices: async () => await depArr()
                }])
                    .then((response) => {
                        const { Title, Salary, Department } = response 
                        db.query(`SELECT id FROM department WHERE name = ?`, [Department], (err, result) => {
                            if (err) {
                                throw err
                            }
                            const departmentId = result[0].id
                            console.log (departmentId)
                            db.query(`INSERT INTO title (title,salary,department_id) VALUE (?,?,?)`, [Title, Salary, departmentId], (err, result) => {
                                if (err) {
                                    throw err
                                }
                                console.log(`Added${Title}!`)
                            })
                        })
                    })
            break
            case ("engageAddEmployee"):
                const manageArr = () => {
                    return new Promise((resolve, reject) => {
                        db.query(`SELECT * FROM employees WHERE manager_id IS null`, (err, result) => {
                            if (err) {
                                reject(err)
                            } else {
                                const resArr = result.map(employees => `${employees.first_name} ${employees.last_name}`)
                                resolve(resArr)
                            }
                        })
                    })
                }
                db.query(`SELECT * FROM role`, (err, result) => {
                    inquirer.prompt([{
                        type: "input",
                        message: "What is the employees first name?",
                        name: "firstName"
                    },
                    {
                        type: "input",
                        message: "What is the employees last name?",
                        name: "lastName"
                    },
                    {
                        type: "input",
                        message: "What is the employee's title?",
                        name: "title",
                        // choices:(title => `${title.title}`)
                    },
                    {
                        type: "input",
                        message: "Who is the manager?",
                        name: "manager",
                        // choices: async () => await manageArr()
                    }])
                        .then((response) => {
                            const { firstName, lastName, title, manager } = response
                            db.query(`SELECT id FROM title WHERE title =?`, [title], (err, result) => {
 
                                // const titleId = result[0].id
                                
                                db.query(`INSERT INTO employees (first_name, last_name,title_id, manager_id) VALUE(?,?,?,?)`, [firstName, lastName, title, manager], (err, result) => {
                                    if (err) {
                                        throw err
                                    }
                                    console.log(`Added ${firstName} ${lastName}`)
                                })
                            })
                        })
                })
            break
            case ("engageUpdateEmployee"):
                const employeeArr = () => {
                    return new Promise((resolve, reject) => {
                        db.query(`SELECT * FROM employees`, (err, result) => {
                            if (err) {
                                reject(err)
                            } else {
                                const resArr = result.map(employees => `${employees.first_name}${employees.last_name}`)
                                resolve(resArr)
                            }
                        })
                    })
                }
            
            const titleArr = () => {
                return new Promise((resolve, reject) => {
                    db.query(`SELECT * FROM title`, (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            const resArr = result.map(title => `${title.title}`)
                            resolve(resArr)
                        }
                    })
                })
            }    
            inquirer.prompt([{
            type:"List",
            message: "Choose an employee's information to update",
            name:"employee",
            choices: async () => await employeeArr()
            },
            {
            type: "List",
            message:"Choose an employee's new title",
            name: "newTitle",
            choices: async() => await titleArr()
            }])
            .then((response) => {
            const {employee, newTitle} = response
            db.query(`SELECT id FROM title WHERE title =?`, [newTitle], (err, result) => {
                if(err){
                    throw err
            }
            const titleId = result[0]
            db.query(`UPDATE employees SET title_id = ? WHERE CONCAT (first_name, "", last_name) =?`,[titleId,employee],(err,result) =>{
                if(err) {
                    throw err
                }
            console.log(`${employee} title changed!`)
            })
            })
            })
            break
            default:
                return
        }
    })
