const { Pool } = require("pg");



const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

const text = `
SELECT students.id, students.name, email, cohorts.name as cohort_name
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

const getData = (arguments) => {
  const data = arguments.slice(2);
  const cohort = data[0]+"%";
  const limit = parseInt(data[1]);
  return [cohort, limit];
};
const values = getData(process.argv);

pool
  .query(text, values)
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(
        `${row.name} has id of ${row.id} and as in the ${row.cohort_name} cohort.${row.email}`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));
