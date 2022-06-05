SELECT assignments.day as day, COUNT(*)
FROM assignments
GROUP BY day
ORDER BY day;