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

const manager = function() {
    return new promise ((res, rej) => {
        inquirer.prompt([
            {
                message: "Enter manager name - ",
                name: "name"
            },
            {
                message: "Enter manager ID - ",
                name: "id"
            },
            {
                message: "Enter email ID - ",
                name: "email"
            },
            {
                message: "Enter Office number - ",
                name: "officeNumber"
            }
        ]).then((data) => {
            employees.push(new Manager(data.name, data.id, data.email, data.officeNumber));
        } )
    })
}


const employee = function() {
    return new promise ((res, rej) => {
        inquirer.prompt([
            {
                message: "Do you wish to add an employee or intern",
                type: "list",
                name: "type",
                choices: [
                    "Engineer",
                    "Intern",
                    "I am done adding employees"
                ]
            }
        ]).then(data => {
            switch (data.type) {
                case "Engineer":
                    return new promise ((res, rej) => {
                        inquirer.prompt([
                            {
                                message: "What is the Engineer's name - ",
                                name: "name"
                            },
                            {
                                message: "What is the ID - ",
                                name: "id"
                            },
                            {
                                message: "What is their email - ",
                                name: "email"
                            },
                            {
                                message: "What is their GitHub username - ",
                                name: "github"
                            }
                        ])
                    }).then((data)=> {
                        employees.push(new Engineer(data.name, data.id, data.email, data.github))
                    })
                break;
                case "Intern":
                    return new promise ((res, rej) => {
                        inquirer.prompt([
                            {
                                message: "What is the Engineer's name - ",
                                name: "name"
                            },
                            {
                                message: "What is the ID - ",
                                name: "id"
                            },
                            {
                                message: "What is their email - ",
                                name: "email"
                            },
                            {
                                message: "What is their School - ",
                                name: "school"
                            }
                        ])
                    }).then((data)=> {
                        employees.push(new Intern(data.name, data.id, data.email, data.school))
                    })
                break;

                case  "I am done adding employees":
                    break;
            }
        })
    })
}

fs.writeFile(outputPath, html, (err) => {
    if (err) throw err;
    console.log(`HTML file created in ${outputPath}`)
})

function init() {
    return new promise((res, rej) => {
        inquirer.prompt([{
            message: "Do you wish to add a manager or an employee",
                type: "list",
                name: "type",
                choices: [
                    "Manager",
                    "Employee",
                ]
        }]).then((data => {
            if(data.type === "Manager") {
                manager()
            } else {
                employee()
            }
        }))
    })
}

init()