const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // If there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
                reject(err);
                // Return out of the function here to make sure the Promisedoens't accidentally executee the resolve() function as well
                return;
            }

            //if everything went well, resolve the Promisee and send the successful data to the `.then()` method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'File Copied!'
            });
        })
    });
};   

// Shorthand for below code
module.exports = { writeFile, copyFile };

// module.exports = {
//     writeFile: writeFile,
//     copyFile: copyFile
// };