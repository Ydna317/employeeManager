const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

init();

function init() {
    console.log("Welcome to the employee manager.");
    requestPrompts();
}

async function requestPrompts() {
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "Add department.",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add role.",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add employee.",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "View departments.",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View roles.",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View employees.",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Update employee role.",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Exit progam.",
                    value: "EXIT_PROGRAM"
                }

            ]
        }
    ]);

    switch (choice) {
        case "ADD_DEPARTMENT":
            return addDepartment();
        case "ADD_ROLE":
            return addRole();
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "VIEW_ROLES":
            return viewRoles();
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole();
        case "EXIT_PROGRAM":
            return exitProgram();
    }
}
// Adds new department to database.
async function addDepartment() {
    const department = await prompt([
        {
            name: "name",
            message: "What is the name of the new department??"
        }
    ]);

    await db.addDepartment(department);

    console.log(`Added ${department.name} to the database`);

    requestPrompts();
}

async function addRole() {
    const departments = await db.viewDepartments();

    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const role = await prompt([
        {
            name: "title",
            message: "What new role would you like to add?"
        },
        {
            type: "list",
            name: "department_id",
            message: "What department does this role belong to?",
            choices: departmentChoices
        },
        {
            name: "salary",
            message: "What is the starting salary for this role?"
        }
    ]);

    await db.addRole(role);

    console.log(`Added ${role.title} to the database`);

    requestPrompts();
}

async function addEmployee() {
    const roles = await db.viewRoles();
    const employee = await prompt([
        {
            name: "first_name",
            message: "What is the new employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the new employee's last name?"
        }
    ]);

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleID } = await prompt({
        type: "list",
        name: "roleID",
        message: "What role will the new employee be performing?",
        choices: roleChoices
    });

    employee.role_id = roleID;
    console.log(
        `Added ${employee.first_name} ${employee.last_name} to the database`
    );

    requestPrompts();

}
async function viewDepartments() {
    const departments = await db.viewDepartments();

    console.log("\n");
    console.table(departments);

    requestPrompts();
}

async function viewRoles() {
    const roles = await db.viewRoles();

    console.log("\n");
    console.table(roles);

    requestPrompts();
}

async function viewEmployees() {
    const departments = await db.viewDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const { departmentId } = await prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you like to see employees for?",
        choices: departmentChoices
      }
    ]);
  
    const employees = await db.viewEmployees(departmentId);
  
    console.log("\n");
    console.table(employees);
  
    requestPrompts();
  }
function exitProgram() {
    console.log("Goodbye.");
    process.exit();
}
  