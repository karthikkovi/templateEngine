const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];
let newEntry = false;

function getManager() {
    return inquirer.prompt([
        {
            name: "name",
            message: "What is the manager's name"
        },
        {
            name: "id",
            message: "What is the manager's ID"
        },
        {
            name: "email",
            message: "Enter the manager email"
        },
        {
            name: "officeNumber",
            message: "Enter the office number"
        }
    ])
}

function employeeTypefn() {
    return inquirer.prompt([
        {
            type: "list",
            name: "employeeType",
            message: "Do you want to add an intern or an engineer",
            choices: ["Intern", "Engineer", "Done"]
        }
    ])
}

function engineerfn() {
    return inquirer.prompt([
        {
            name: "name",
            message: "Enter the name of the Engineer"
        },
        {
            name: "id",
            message: "Enter the engineer ID"
        },
        {
            name: "email",
            message: "Enter the email ID"
        },
        {
            name: "gitHub",
            message: "Enter the gitHub username"
        }
    ])
}

function internfn() {
    return inquirer.prompt([
        {
            name: "name",
            message: "Enter the name of the Intern"
        },
        {
            name: "id",
            message: "Enter the intern ID"
        },
        {
            name: "email",
            message: "Enter the email ID"
        },
        {
            name: "school",
            message: "Enter the School name"
        }
    ])
}

async function init() {

    const manager = await getManager();
    employees.push(new Manager(manager.name, manager.id, manager.email, manager.officeNumber))
    while (!newEntry) {

        let employeeType = await employeeTypefn();

        if (employeeType.employeeType === "Engineer") {
            let engineer = await engineerfn();
            employees.push(new Engineer(engineer.name, engineer.id, engineer.email, engineer.gitHub))
        } else if (employeeType.employeeType === "Intern") {
            let intern = await internfn();
            employees.push(new Intern(intern.name, intern.id, intern.email, intern.school))
        } else {
            let html = render(employees)

            fs.writeFile(outputPath, html, (err) => {
                if (err) {
                    throw err
                }
                console.log(`File is written at ${outputPath}`)
                newEntry = true;
            })
        }
    }
}

init()