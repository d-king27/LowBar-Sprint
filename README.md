# Lowbar

 Re-implementation of the Underscore.js Library http://underscorejs.org/
As part of the Northcoders bootcamp we were tasked in re-implementing the underscore.js libary from scratch.It involved rewriting 31 functions in total. One particular skill related to this project is functional programming, which is a declarative programming paradigm where the output of any function depends only upon the arguments that are passed into the function.


### Prerequisites

This project requires Node.js and npm to run, installation instructions can be found here:

```
https://nodejs.org/en/download/package-manager/
https://www.npmjs.com/get-npm
```

### Installing

using the terminal:

clone the repo to your local machine
```
git clone https://github.com/d-king27/LowBar-Sprint.git
```

run npm install

```
npm install
```

The functions are now avalibale to use in other works

example
```
const _ = require('./{PATH TO CLONED REPO}/index.js')

_.identity('x') //'x'x
```


## Running the tests

The project has over 100 unit tests (using mocha) which can be run using npm test

```
npm test
```

### Example Test

A standard set of results unit test is shown below

```
#each
      ✓ is a function
      ✓ returns a sole argument
      ✓ if passed with an array as the list arguement,
        calls the function the amount of times equal to the length
      ✓ if passed with an object,
          calls the function the amount of times equal to the amount of key value pairs
      ✓ if passed with a string,
        calls the function the amount of times equal to the length
```
The test involves testing all the prerequisites from the underscore libary as well as some edge cases within each test



## Acknowledgments

Northcoders Organisation and all affiliated tutors



