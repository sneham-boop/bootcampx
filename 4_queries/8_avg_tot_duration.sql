SELECT AVG(total_assistance_request_duration) AS average_total_duration
FROM (
    SELECT cohorts.name,
      SUM(completed_at - started_at) AS total_assistance_request_duration
    FROM assistance_requests
      JOIN students ON student_id = students.id
      JOIN cohorts ON cohorts.id = students.cohort_id
    GROUP BY cohorts.name
  ) AS example_table;