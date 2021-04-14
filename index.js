const { prompt } = require("inquirer");
const { addEmployee, viewDepartments, updateEmployeeRole } = require("./db");
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
    }

    async function viewEmployees() {
        const employees = await db.viewEmployees();

        console.log("\n");
        console.table(employees);

        requestPrompts();
    }

    async function addDepartment() {
        const department = await prompt([
            {
                name: "name",
                message: "What is the name of the department?"
            }
        ]);

        await db.addDepartment(department);

        console.log(`Added ${department.name} to the database`);

        requestPrompts();
    }
    async function addRole() {
        const role = await prompt([
            {
                name: "name",
                message: "What role would you like to add?"
            }
        ]);

        await db.addRole(role);

        console.log(`Added ${role.name} to the database`);

        requestPrompts();
    }
    async function addEmployee() {
        const employee = await prompt([
            {
                name: "name",
                message: "What is the name of the employee?"
            }
        ]);

        await db.addEmployee(employee);

        console.log(`Added ${employee.name} to the database`);

        requestPrompts();
    }
}