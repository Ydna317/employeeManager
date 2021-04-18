const connection = require("./dbconnect");

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    // Adds a new department
    addDepartment(department) {
        return this.connection.query("INSERT INTO department SET ?", department);
    }
    // Adds a new role
    addRole(role) {
        return this.connection.query("INSERT INTO role SET ?", role);
    }
    // Adds a new employee
    addEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
    }
    // View departments
    viewDepartments() {
        return this.connection.query(
            "SELECT department.id, department.name, SUM(role.salary) AS total_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name"
        );
    }
    // View roles
    viewRoles() {
        return this.connection.query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }
    // View employees
    viewEmployees(departmentId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
            departmentId
          );
        }
    // Update the given employee's role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }
}

module.exports = new DB(connection);
