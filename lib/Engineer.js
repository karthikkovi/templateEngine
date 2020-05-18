// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const employee = require("./Employee")

class Engineer extends employee {
    constructor (name, id, email, githubUserName) {
        super (name, id, email);

        this.role = "Engineer";
        this.github = githubUserName;
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;