// Dependencies needed, Link required file paths for classes
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs"); const manager = require("./lib/Manager");
const engineer = require("./lib/Engineer");
const intern = require("./lib/Intern");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Use inquirer to gather information about the development team members, and to create objects for each team member (using the correct classes as blueprints!)
const employeeList = [];

// Initial questions to start creating a new employee, select role type to determine questions to ask
const roleInquiry = [
    {
        type: "list",
        name: "Role",
        message: "Please choose the Employee's role to be added.",
        choices: ["Manager", "Engineer", "Intern"]
    }
]

// Ask manager-specific questions for build
const managerInfo = [
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
]

// Add engineer-specific questions for build
const engineerInfo = [
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
]

// Ask intern-specific questions for build
const internInfo = [
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
]

// Begin asking question to determine role of employee to be added and questions to be asked
const init = () => {
    inquirer.prompt(roleInquiry).then(function (answers) {
        if (answers.Role === "Manager") {
            addManager();
        }
        else if (answers.roleInquiry === "Engineer") {
            addEngineer();
        }
        else if (answers.roleInquiry === "Intern") {
            addIntern();
        } else {
            displayTeam(render(employeeList));
        }
    })
}

// Ask Manager questions and create manager
function addManager() {
    inquirer.prompt(managerInfo).then(function (answers) {
        const newMgmt = new Manager(answers.name, answers.ID, answers.Email, answers.OfficeNumber);
        employeeList.push(newManager);
        init();
    })
};

// Ask engineer questions and create engineer
function addEngineer() {
    inquirer.prompt(engineerInfo).then(function (answers) {
        const newEng = new Engineer(answers.name, answers.ID, answers.Email, answers.GitHubUsername);
        employeeList.push(newEng);
        init();
    })
};

// Ask intern questions and create intern
function addIntern() {
    inquirer.prompt(internInfo).then(function (answers) {
        const newInt = new Intern(answers.name, answers.ID, answers.Email, answers.School);
        employeeList.push(newInt);
        init();
    })
};


function buildTeam() {
    fs.writeFile(outputPath, render(teamMembers), function (err) {
        if (err) {
            console.log(err);
        }
    })
}

function myFunc() {
    fs.writeFile(outputPath, render(teamMembers), function (err) {
        if (err) {
            console.log(err);
        }
    })
}

// Start the prompt
init();
