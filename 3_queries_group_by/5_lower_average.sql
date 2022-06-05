SELECT students.name AS student, 
AVG(assignment_submissions.duration) AS avg_assignment_duration, 
AVG(assignments.duration) AS avg_estimated_duration
FROM assignment_submissions
JOIN assignments ON assignment_submissions.assignment_id = assignments.id
JOIN students ON students.id = assignment_submissions.student_id
WHERE students.end_date IS NULL
GROUP BY student
HAVING AVG(assignment_submissions.duration) < AVG(assignments.duration)
ORDER BY avg_assignment_duration;