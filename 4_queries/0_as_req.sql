SELECT COUNT(assistance_requests.*) AS total_assistances, students.name as name
FROM assistance_requests
JOIN students ON students.id = student_id
GROUP BY name
HAVING teachers.name = 'Waylon Boehm';
