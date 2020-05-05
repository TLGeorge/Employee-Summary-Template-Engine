// Dependencies needed, Link required file paths for classes
const manager = require("./lib/Manager");
const engineer = require("./lib/Engineer");
const intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Use inquirer to gather information about the development team members, and to create objects for each team member (using the correct classes as blueprints!)
const employeeList = [];

// Initial questions to start creating a new employee, select role type to determine class to apply
const createTeam = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "Role",
            message: "Please choose the Employee's role to be added.",
            choices: ["Manager", "Engineer", "Intern"]
        }
    ])
        .then((res) => {
            if (res.role === "Manager") { addManager() }
            else if (res.role === "Engineer") { addEngineer() }
            else if (res.role === "Intern") { addIntern() }
        });
}

// Confirm if you would like to add additional employees to your team. If not, then there are no more prompts and all entries are displayed 
const addEmployees = () => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "AdditionalEmployees",
            message: "Would you like yo add additional employees?"
        }
    ]).then((res) => {
        if (res.AdditionalEmployees === true) { createTeam(); }
        else if (res.build === false) { displayTeam(); }
    });
}

// Ask manager-specific questions for build
const addManager = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "Name",
            message: "Please enter the employee's name."
        },
        {
            type: "input",
            name: "ID",
            message: "Please enter the employee's ID."
        },
        {
            type: "input",
            name: "Email",
            message: "Please enter the employee's email address."
        },
        {
            type: "input",
            name: "OfficeNumber",
            message: "Please enter the manager's office number."
        },
    ]).then(addMan => {
        const addEmp = new Manager(addMan.Name, addMan.ID, addMan.Email, addMan.OfficeNumber);
        employeeList.push(addEmp);
        addEmployees();
    });
}

// Add engineer-specific questions for build
const addEngineer = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "Name",
            message: "Please enter the employee's name."
        },
        {
            type: "input",
            name: "ID",
            message: "Please enter the employee's ID."
        },
        {
            type: "input",
            name: "Email",
            message: "Please enter the employee's email address."
        },
        {
            type: "input",
            name: "GitHubUsername",
            message: "Please enter the engineer's GitHub Username."
        }
    ]).then(addEngi => {
        const addEmp = new Manager(addEngi.Name, addEngi.ID, addEngi.Email, addEngi.OfficeNumber);
        employeeList.push(addEmp);
        addEmployees();
    });
}

// Ask intern-specific questions for build
const addIntern = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "Name",
            message: "Please enter the employee's name."
        },
        {
            type: "input",
            name: "ID",
            message: "Please enter the employee's ID."
        },
        {
            type: "input",
            name: "Email",
            message: "Please enter the employee's email address."
        },
        {
            type: "input",
            name: "School",
            message: "Please enter the intern's school."
        }
    ]).then(addInt => {
        const addEmp = new Manager(addInt.Name, addInt.ID, addInt.Email, addInt.OfficeNumber);
        employeeList.push(addEmp);
        addEmployees();
    });
}

// Display team once manager has confirm that there are no more employees to add 
const displayTeam = () => {
    const stringToWrite = render(employees);
    fs.writeFile(outputPath, stringToWrite, function (err) {
        if (err) {
            throw err;
        }
    });
}

createTeam();
