const { Pool } = require("pg");

const getData = (arguments) => {
  const data = arguments.slice(2);
  const cohort = data[0];
  return [cohort];
};

const values = getData(process.argv);

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

const text = `
SELECT DISTINCT teachers.name as teacher, cohorts.name AS cohort
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teacher;
`;

pool
  .query(text, values)
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(
        `${row.cohort}: ${row.teacher}`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));
