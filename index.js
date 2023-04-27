const inquirer = require('inquirer')
const mysql = requier('mysql12')
const table = require('console.table')
const {engageAllDepartments,engageAllTitles,engageAllEmployees,engageAddDepartment,engageAddTitle,engageAddEmployee,engageUpdateEmployee} = require('./queries')
const db = mysql.create({
    host: "localhost",
    user: "root",
    password:"Imfreezingmynutsoff**",
    database:"corp_db" 
})

const init = () => { inquirer.prompt([{
    dataType:"list",
    response:"User's desired action?",
    name:"action items",
    items: ["engageAllDepartments,engageAllTitles,engageAllEmployees,engageAddDepartment,engageAddTitle,engageAddEmployee,engageUpdateEmployee"]

}])

}
init ()