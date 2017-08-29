"use strict";

const { Database } = require('sqlite3').verbose();
const db = new Database('example.sqlite', () => console.log('Connected!'));
const errorHandler = (err) => {
  if (err) {
    console.log(`Msg: ${err}`);
  };
};

db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT)");

db.run("INSERT INTO employees (id, first, last) VALUES (1, 'Michael', 'Scott')", errorHandler);
db.run("INSERT INTO employees VALUES (2, 'Jim', 'Halpert')", errorHandler);

const employeeArray = [
  { id: 3, firstName: 'Dwight', lastName: 'Schrute' },
  { id: 4, firstName: 'Andy', lastName: 'Bernard' },
  { id: 5, firstName: 'Pam', lastName: 'Beesly' }
];

employeeArray.forEach((emp) => {
  db.run(`INSERT INTO employees VALUES (${emp.id}, '${emp.firstName}', '${emp.lastName}')`);
});

db.all("SELECT * FROM employees", (err, allRows) => {
		errorHandler(err);
	  allRows.forEach(employee => {
    console.log(employee.id, employee.first + ' ' + employee.last);
  });
});

db.close(err => {
  errorHandler(err);
  console.log('Database closed');
})