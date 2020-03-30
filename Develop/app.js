const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeArray = [];


addEmployee();
function addEmployee() {

    inquirer
        .prompt([
            {
                message: "Select employee type",
                type: "list",
                name: "role",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern"
                ]
            },
            {
                message: "Name of team member",
                type: "input",
                name: "name"
            },
            {
                message: "Team member ID?",
                type: "input",
                name: "id"
            },
            {
                message: "Email of team member?",
                type: "input",
                name: "email"
            },
        ]).then(function ({ role, name, id, email }) {
            switch (role) {

                case "Engineer":
                    inquirer
                        .prompt([
                            {
                                message: "Engineers Github username?",
                                type: "input",
                                name: "github"
                            },
                            {
                                message: "Would you like to add another member?",
                                type: "confirm",
                                name: "addMember"
                            }
                        ]).then(function ({ github, addMember }) {
                            const newEngineer = new Engineer(name, id, email, github)
                            employeeArray.push(newEngineer);
                            if (addMember) {
                                addEmployee();
                            } else {
                                fs.writeFileSync(outputPath, render(employeeArray), "utf-8", err => {
                                    if (err) throw err;
                                });
                            }
                        });
                    break;

                case "Intern":
                    inquirer
                        .prompt([
                            {
                                message: "What school is the intern attending?",
                                type: "input",
                                name: "school"
                            },
                            {
                                message: "Would you like to add another member?",
                                type: "confirm",
                                name: "addMember"
                            }
                        ]).then(function ({ school, addMember }) {
                            const newIntern = new Intern(name, id, email, school)
                            employeeArray.push(newIntern);
                            if (addMember) {
                                addEmployee();
                            } else {
                                fs.writeFileSync(outputPath, render(employeeArray), "utf-8", err => {
                                    if (err) throw err;
                                });
                            }
                        });
                    break;

                case "Manager":
                    inquirer
                        .prompt([
                            {
                                message: "Managers office number?",
                                type: "input",
                                name: "officeNumber"
                            },
                            {
                                message: "Would you like to add another member?",
                                type: "confirm",
                                name: "addMember"
                            }
                        ]).then(function ({ officeNumber, addMember }) {
                            const newManager = new Manager(name, id, email, officeNumber)
                            employeeArray.push(newManager);
                            if (addMember) {
                                addEmployee();
                            } else {
                                fs.writeFileSync(outputPath, render(employeeArray), "utf-8", err => {
                                    if (err) throw err;
                                });
                            }
                        });
                    break
            }
        })
}