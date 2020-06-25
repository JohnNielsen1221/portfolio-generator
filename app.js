const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template.js');


const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username. (Required)',
            validate: usernameInput => {
                if (usernameInput) {
                    return true;
                } else {
                    console.log('Please enter your username!');
                    return false;
                }
            }

        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => confirmAbout
        }
    ]);
};
const promptProject = portfolioData => {
    // If there's no 'projects' array property, create on
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    console.log(`
        ==================
        Add a New Project
        ==================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: projectNameInput => {
                if (projectNameInput) {
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }

        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projectDescriptionInput => {
                if (projectDescriptionInput) {
                    return true;
                } else {
                    console.log('Please enter your project description!');
                    return false;
                }
            }

        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('Please enter your project link!');
                    return false;
                }
            }

        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    })
}

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData);
        fs.writeFile('./index.html', pageHTML, err => {
          if (err) throw new Error(err);
          console.log('Page created! Check out index.html in this directory to see it!');
        });
    });


    



// const profileDataArgs = process.argv.slice(2, process.argv.length);
// const [name, github] = profileDataArgs;


// fs.writeFile('index.html', generatePage(name, github,), err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out the index.html to see the output!');
// });

// JUST FOR REFERENCE PURPOSES

// const profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs)

// const printProfileData = profileDataArr => {
//     for (let i=0; i<profileDataArr.length; i +=1) {
//     console.log(profileDataArr[i]);

//     console.log('================');

//     profileDataArr.forEach(profileItem => console.log(profileItem));
//     }
// };

// printProfileData(profileDataArgs)