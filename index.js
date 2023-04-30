const inquirer = require("inquirer")
const mysql = require("mysql2")
const table = require("console.table")
const { engageAllDepartments, engageAllTitles, engageAllEmployees, engageAddDepartment, engageAddTitle, engageAddEmployee, engageUpdateEmployee } = require('./queries')
const { VirtualAction } = require("rxjs")
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Imfreezingmynutsoff**",
    database: "corp_db"
},
console.log(`Linked to corp_db database.`))

const init = () => {
    inquirer.prompt([{
        type: "list",
        message: "User's desired action?",
        name: "action_items",
        choices: ["engageAllDepartments","engageAllTitles","engageAllEmployees","engageAddDepartment","engageAddTitle","engageAddEmployee","engageUpdateEmployee"]

    }])

    .then((response) => {
        const {action_items} = response
        switch (action_items) {
            case ("engage All Departments"):
                engageAllDepartments()
                setTimeout(init, 1000)
            break
            case ("engage All Titles"):
                engageAllTitles()
                setTimeout(init, 1000)
            break
            case ("engage All Employees"):
                engageAllEmployees()
                setTimeout(init, 1000)
            break
            case ("engage ADD Department"):
                engageAddDepartment()
                setTimeout(init, 1000)
            break
            case ("engage ADD Title"):
                engageAddTitle()
                setTimeout(init, 1000)
            break
            case ("engage ADD Employee"):
                engageAddEmployee()
                setTimeout(init, 1000)
            break
            case ("engage Update Employee"):
                engageUpdateEmployee()
                setTimeout(init, 1000)
            break
            default:
                return
        }
    })
}
init()