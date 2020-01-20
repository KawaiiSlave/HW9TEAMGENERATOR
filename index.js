let inquirer = require('inquirer');
let fs = require("fs");
let Manager = require("./lib/Manager");
let Engineer = require("./lib/Engineer");
let Intern = require("./lib/Intern");
let employeeArray = [];

function init() {

    inquirer.prompt([

        {

            type: "input",

            message: "What is your name?",

            name: "name",

        },

        {

            type: "input",

            message: "What is your ID number?",

            name: "id",

        },

        {

            type: "input",

            message: "What is your E-Mail?",

            name: "email",

        },

        {

            type: "input",

            message: "What is your office number?",

            name: "officeNumber",

        },

    ]).then(function (res) {

        let manager = new Manager(res.name, res.id, res.email, res.officeNumber);

        employeeArray.push(manager);

        newEmployee();

    });

};

function newEmployee() {

    inquirer.prompt([

        {

            type: "list",

            message: "Do you want to create another employee?",

            choices: ["Engineer", "Intern", "I don't want to create another employee"],

            name: "newEmployee",

        },

    ]).then(function (response) {

        if (response.newEmployee === "Engineer") {

            newEngineer();

        } else if (response.newEmployee === "Intern") {

            newIntern();

        } else {

            writeHTML();

        }

    });

};

function newEngineer() {

    inquirer.prompt([

        {

            type: "input",

            message: "What is your name?",

            name: "name",

        },

        {

            type: "input",

            message: "What is your ID number?",

            name: "id",

        },

        {

            type: "input",

            message: "What is your E-Mail?",

            name: "email",

        },

        {

            type: "input",

            message: "What is your GitHub username?",

            name: "github",

        },

    ]).then(function (res) {

        let engineer = new Engineer(res.name, res.id, res.email, res.github);

        employeeArray.push(engineer);

        newEmployee();

    });

};

function newIntern() {

    inquirer.prompt([

        {

            type: "input",

            message: "What is your name?",

            name: "name",

        },

        {

            type: "input",

            message: "What is your ID number?",

            name: "id",

        },

        {

            type: "input",

            message: "What is your E-Mail?",

            name: "email",

        },

        {

            type: "input",

            message: "Where do you attend school?",

            name: "school",

        },

    ]).then(function (res) {

        let intern = new Intern(res.name, res.id, res.email, res.school);

        employeeArray.push(intern);

        newEmployee();

    });

};


let rowHTML = [];



function employeeHTML() {

    employeeArray.forEach(function(employee) {

    

        if (employee.title === "Manager") {

            let managerText = managerHTML(employee.name, employee.title, employee.id, employee.email, employee.officeNumber);

            rowHTML.push(managerText);

        } else if (employee.title === "Engineer") {

            let engineerText = engineerHTML(employee.name, employee.title, employee.id, employee.email, employee.github);

            rowHTML.push(engineerText);

        } else if (employee.title === "Intern") {

            let internText = internHTML(employee.name, employee.title, employee.id, employee.email, employee.school);

            rowHTML.push(internText);

        }

        function managerHTML() {

            return `<div class="card m-3 shadow-lg">

                <div class="card-header bg-primary text-white">

                    <h3>${employee.name}</h3>

                    <h3>${employee.title}</h3>

                </div>

                <div class="container bg-light p-3">

                    <ul class="list-group list-group-flush border-light">

                        <li class="list-group-item">ID: ${employee.id}</li>

                        <li class="list-group-item">E-mail: <a href="#">${employee.email}</a></li>

                        <li class="list-group-item">Office Number: ${employee.officeNumber}</li>

                    </ul>

                </div>

            </div>`

        }

        function engineerHTML() {

            return `<div class="card m-3 shadow-lg">

                <div class="card-header bg-primary text-white">

                    <h3>${employee.name}</h3>

                    <h3>${employee.title}</h3>

                </div>

                <div class="container bg-light p-3">

                    <ul class="list-group list-group-flush border-light">

                        <li class="list-group-item">ID: ${employee.id}</li>

                        <li class="list-group-item">E-mail: <a href="#">${employee.email}</a></li>

                        <li class="list-group-item">GitHub: ${employee.github}</li>

                    </ul>

                </div>

            </div>`

        }

        function internHTML() {

            return `<div class="card m-3 shadow-lg">

                <div class="card-header bg-primary text-white">

                    <h3>${employee.name}</h3>

                    <h3>${employee.title}</h3>

                </div>

                <div class="container bg-light p-3">

                    <ul class="list-group list-group-flush border-light">

                        <li class="list-group-item">ID: ${employee.id}</li>

                        <li class="list-group-item">E-mail: <a href="#">${employee.email}</a></li>

                        <li class="list-group-item">GitHub School: ${employee.school}</li>

                    </ul>

                </div>

            </div>`

        }

        

    });

};



function generateHTML() {

    employeeHTML();



    return `<!DOCTYPE html>

    <html lang="en">

    

    <head>

        <meta charset="UTF-8">

        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"

            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

        <title>My Team</title>

    </head>

    

    <body>

        <div class="header">

            <h1 class="bg-danger text-white text-center p-5">My Team</h1>

        </div>

        <div class="container">

            <div class="row justify-content-center">

                ${rowHTML}

            </div>

        </div>

    </body>

    

    </html>`

};

function writeHTML() {

    fs.writeFile("./output/team.html", generateHTML(), function (err) {

        if (err) {

            return console.log(err);

        }

        console.log("Success!");



    });

};

init();