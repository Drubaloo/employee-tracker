// Dependencies
var express = require("express");
var mysql = require("mysql");
const inquirer = require("inquirer")

// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Endgam3r!!",
  database: "tracker_db"
});

// Initiate MySQL Connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
function start() {
  inquirer
    .prompt({
      type: `list`,
      message: `What would you like to do?`,
      choices: [`View all employees`, `View all employees by department`, `View all employees by manager`, `Add employee`, `Remove employee`, `Update employee role`, `Update employee manager`, `View all roles`, `Add role`, `Remove role`],
      name: `initialize`
    }).then((answer) => {
      console.log(answer)
      switch (answer.initialize) {
        case `View all employees`:
          getAllEmployees()
          break

        case `View all employees by department`:
          getEmployeeByDepartment()
          break

        case `View all employees by manager`:
          getEmployeeByManager()
          break

        case `Add employee`:
          addEmployee()
          break

          case `Remove employee`:
            removeEmployee()
            break
      }
    })
}

const getAllEmployees = function () {
  connection.query("SELECT * FROM tracker_db.employee;", function (err, res) {
    if (err) throw err;

    console.table(res)

    start()
  })
}

const getEmployeeByDepartment = function () {
  connection.query("SELECT * FROM tracker_db.employee ORDER BY tracker_db.role.department_id;", function (err, res) {
    if (err) throw err;

    console.table(res)

    start()
  })
}

const addEmployee = function () {
  console.log(`Adding a new Employee!...\n`)
  inquirer
    .prompt([
      {
        type: `input`,
        message: `What is the employee's first name?`,
        name: `first_name`
      },
      {
        type: `input`,
        message: `What is the employee's last name?`,
        name: `last_name`
      },
      {
        type: `number`,
        message: `What is the employee's Role ID number??`,
        name: `role_id`
      },
      {
        type: `number`,
        message: `What is the employee's Manager ID number??`,
        name: `manager_id`
      }
    ]).then((answers) => {
      connection.query(
        "INSERT INTO tracker_db.employee SET ?", answers, function (err, res) {
          if (err) throw err;
          console.log(`Employee added!`);
          start()
        }
      )

    })

}

const removeEmployee = function () {
  connection.query("SELECT * FROM tracker_db.employee;", function (err, res) {
    if (err) throw err;

    console.table(res)
  })

  inquirer
  .prompt({
    type: `input`,
    message: `What employee ID do you want to delete?`,
    name: `deleteID`
  }).then((answer) => {
    console.log(answer)
    connection.query("DELETE FROM tracker_db.employee WHERE id = ?", answer.deleteID, function (err, res) {
      if (err) throw err;

      console.log(`Employee deleted`)
      start()
    })
  })
}

start()