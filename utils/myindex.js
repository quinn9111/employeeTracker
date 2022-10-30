const db = require("../db/connect");
const inquirer = require('inquirer');

function startEmployeeTracker() {
  console.log("");
  console.log("Employee Manager");
  setTimeout(() => {
    options();
  }, 1000);
}

function options() {
  console.log("");
  inquirer
    .prompt({
      type: "list",
      name: "home",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit",
      ],
    })
    .then(({ home }) => {
      if (home === "View All Departments") {
        viewAllDepartments();
      } else if (home === "View All Roles") {
        viewAllRoles();
      } else if (home === "View All Employees") {
        viewAllEmployees();
      } else if (home === "Add Role") {
        addRole();
      } else if (home === "Add Department") {
        addDepartment();
      } else if (home === "Add Employee") {
        addEmployee();
      } else if (home === "Update Employee Role") {
        updateEmployeeRole();
      } else if (home === "Quit") {
        endProgram();
      }
    });
}

function viewAllDepartments() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err.message);
    }
    console.log("");
    console.table(rows);
    setTimeout(() => {
      options();
    }, 1000);
  });
}

function viewAllRoles() {
  const sql = `SELECT * from roles`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err.message);
    }
    console.log("");
    console.table(rows);
    setTimeout(() => {
      options();
    }, 1000);
  });
}

function viewAllEmployees() {
  const sql = ` SELECT * from employee`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err.message);
    }
    console.table(rows);
    setTimeout(() => {
      options();
    }, 1000);
  });
}

function addRole() {
const getDepartments = new Promise((resolve, reject) => {
    var departmentsArr = [];
    const sql = `SELECT name FROM department`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err.message);
      }
      for (var i = 0; i < rows.length; i++) {
        departmentsArr.push(Object.values(rows[i])[0]);
      }
      resolve(departmentsArr);
    });
  });

  getDepartments.then((departmentsArr) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "deptId",
          message: "Choose the department of your role",
          choices: departmentsArr,
          filter: (deptIdInput) => {
            if (deptIdInput) {
              return departmentsArr.indexOf(deptIdInput);
            }
          },
        },
        {
          type: "text",
          name: "roleTitle",
          message: "What is the title of your role?",
        },
        {
          type: "number",
          name: "roleSalary",
          message: "What is the salary for the role?",
          filter: (roleSalaryInput) => {
            if (!roleSalaryInput || roleSalaryInput === NaN) {
              return "";
            } else {
              return roleSalaryInput;
            }
          },
        },
      ])
      .then(({ deptId, roleTitle, roleSalary }) => {
        const sql =
          "INSERT INTO roles (department_id, title, salary) VALUES (?,?,?)";
        const query = [deptId + 1, roleTitle, roleSalary]; 
        db.query(sql, query, (err, rows) => {
          if (err) {
            console.log(err.message);
          }
          console.log('');
            console.log(`Role Added!`); {
                options();
              }
        });
      });
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "text",
        name: "newDept",
        message: "Department name:",
      },
    ])
    .then(({ newDept }) => {
      const sql = "INSERT INTO department (name) VALUES (?)";
      const query = [newDept];
      db.query(sql, query, (err, rows) => {
        if (err) {
          console.log(err.message);
        }
        console.log('');
            console.log(`Department Added!`);{
                options();
              }
      });
    });
}

function addEmployee() {
  const getTitles = new Promise((resolve, reject) => {
    var titlesArr = [];
    const sql = `SELECT title FROM roles`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err.message);
      }
      for (var i = 0; i < rows.length; i++) {
        titlesArr.push(Object.values(rows[i])[0]);
      }
      resolve(titlesArr);
    });
  });
  const getActiveManagerList = new Promise((resolve, reject) => {
    var activeManagerArr = [];
    const sql = ` SELECT DISTINCT concat(m.first_name, ' ', m.last_name) 
                  AS manager FROM employee e, employee m 
                  WHERE m.id = e.manager_id  `;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err.message);
      }
      for (var i = 0; i < rows.length; i++) {
        activeManagerArr.push(Object.values(rows[i])[0]);
      }
      activeManagerArr.push("Show more");
      resolve(activeManagerArr);
    });
  });

  const getManagerList = new Promise((resolve, reject) => {
    var managerArr = [];
    const sql = ` SELECT concat(m.first_name, ' ', m.last_name) 
                  AS manager FROM employee m `;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err.message);
      }
      for (var i = 0; i < rows.length; i++) {
        managerArr.push(Object.values(rows[i])[0]);
      }
      managerArr.push("This is a management personnel");
      resolve(managerArr);
    });
  });
  const getManIdList = new Promise((resolve, reject) => {
    var manIdArr = [];
    const sql = ` SELECT DISTINCT m.id AS manager 
                  FROM employee e, employee m 
                  WHERE m.id = e.manager_id `;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err.message);
      }
      for (var i = 0; i < rows.length; i++) {
        manIdArr.push(
          Object.values(rows[i])[0]
        );
      }
      resolve(manIdArr);
    });
  });
 Promise.all([getTitles, getActiveManagerList, getManagerList, getManIdList]).then(([titlesArr, activeManagerArr, managerArr, manIdArr]) => {
    inquirer
      .prompt([
        {
          type: "text",
          name: "firstname",
          message: "First Name:",
        },
        {
          type: "text",
          name: "lastname",
          message: "Last Name:",
        },
        {
          type: "list",
          name: "roleId",
          message: "Choose the employee's role title",
          choices: titlesArr,
          filter: (roleIdInput) => {
            if (roleIdInput) {
              return titlesArr.indexOf(roleIdInput) + 1;
            }
          }
        },
        {
          type: "list",
          name: "managerID1",
          message: "Select name of manager",
          choices: activeManagerArr,
          filter: managerID1Input => {
            if (managerID1Input === "Show more") {
              return managerID1Input;
            } else {
              return activeManagerArr.indexOf(managerID1Input);
            }
          }
        },
        {
          type: "list",
          name: "managerID2",
          message: "Select name of manager",
          choices: managerArr,
          filter: (managerID2Input) => {
            if (managerID2Input === "This is management personnel") {
              return managerID2Input;
            } else {
              return managerArr.indexOf(managerID2Input) + 1;
            }
          },
          when: ({ managerID1 }) => {
            if (isNaN(managerID1) === true) {
              return true;
            } else {
              return false;
            }
          }
        }
      ])
      .then(
        ({ firstname, lastname, roleId, managerID1, managerID2 }) => {          
          const getManId = () => {
            if (isNaN(managerID1)) {
              if(isNaN(managerID2)) {
                managerArr.push(firstname + ' ' + lastname);
                return managerArr.indexOf(firstname + ' ' + lastname);
              } else {
                return managerID2;
              }
            } else {
              return manIdArr[managerID1];                                         
            }
          }
          const manId = getManId();
          const sql =
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
          const query = [
            firstname,
            lastname,
            roleId,
            manId
          ]; 
          db.query(sql, query, (err, rows) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log('');
              console.log(`Employee Added!`);
                {
                  options();
                }
            }
          });
        }
      );
  });
}

function updateEmployeeRole() {
  const getTitles = new Promise((resolve, reject) => {
    var titlesArr = [];
    const sql = `SELECT title FROM roles`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err.message);
      }
      for (var i = 0; i < rows.length; i++) {
        titlesArr.push(Object.values(rows[i])[0]); 
      }
      resolve(titlesArr);
    });
  });

  const getEmployees = new Promise((resolve, reject) => {
    var employeesArr = [];
    const sql = `SELECT first_name, last_name FROM employee`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err.message);
      }
      for (var i = 0; i < rows.length; i++) {
        employeesArr.push(
          Object.values(rows[i])[0] + " " + Object.values(rows[i])[1]
        ); 
      }
      resolve(employeesArr);
    });
  });

  Promise.all([getTitles, getEmployees]).then(([titlesArr, employeesArr]) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeName",
          message: "Please select an employee to update",
          choices: employeesArr,
          filter: (employeeNameInput) => {
            if (employeeNameInput) {
              return employeesArr.indexOf(employeeNameInput);
            } 
          },
        },
        {
          type: "list",
          name: "employeeRole",
          message: "Select the new role for this employee.",
          choices: titlesArr,
          filter: (employeeRoleInput) => {
            if (employeeRoleInput) {
              return titlesArr.indexOf(employeeRoleInput);
            }
          },
        },
      ])
      .then(({ employeeName, employeeRole }) => {
        const sql = "UPDATE employee SET role_id = ? WHERE id = ?";
        const query = [employeeRole + 1, employeeName + 1];
        db.query(sql, query, (err, rows) => {
          if (err) {
            console.log(err.message);
          }
          console.log('');
            console.log(`Updated employee's role!`);{
                options();
              }
        });
      });
  });
}

function endProgram() {
  setTimeout(() => {
    console.log("");
    console.log(`Quit Employee Tracker`);
  }, 1000);
  setTimeout(() => {
    process.Quit(1);
  }, 1000);
}

module.exports = startEmployeeTracker;