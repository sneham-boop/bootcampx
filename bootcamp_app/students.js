const { Pool } = require("pg");

const getData = (arguments) => {
  const data = arguments.slice(2);
  const cohort = data[0];
  const limit = parseInt(data[1]);
  return { cohort, limit };
};

const { cohort, limit } = getData(process.argv);
// console.log(cohort,limit);

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

const SQLQuery = `
SELECT students.id, students.name, cohorts.name as cohort_name
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '${cohort}%'
LIMIT ${limit};
`;

pool
  .query(SQLQuery)
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(
        `${row.name} has id of ${row.id} and as in the ${row.cohort_name} cohort.`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));
