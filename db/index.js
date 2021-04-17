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
            "SELECT department.id, department.name"
        );
    }
    // View roles
    viewRoles() {
        return this.connection.query(
            "SELECT role.id, role.title, role.salary, role.department_id"
        );
    }
    // View employees
    viewEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id"
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
