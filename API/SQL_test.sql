CREATE FUNCTION distance(a POINT, b POINT) RETURNS double DETERMINISTIC RETURN ifnull(acos(sin(X(a)) * sin(X(b)) + cos(X(a)) * cos(X(b)) * cos(Y(b) - Y(a))) * 6380, 0);

SELECT * FROM metadata;
create temporary table top_ten as (select device, count(*) as COUNT from metadata group by device order by COUNT desc limit 10);
select * FROM top_ten;

select * from photo_locations as a join metadata as b ON a.pid = b.pid where b.device = (select device from top_ten limit 1 offset 1);
select * from photo_locations as a join metadata as b ON a.pid = b.pid where b.device like 'FUJIFILM%';
CREATE TEMPORARY TABLE loc_subset as (SELECT * FROM photo_locations WHERE DISTANCE(points, POINT(-0.104,51.51) ) <=500);
select * from loc_subset;
CREATE TEMPORARY TABLE meta_subset as (select a.pid,device from photo_locations as a join metadata as b ON a.pid = b.pid where b.device like "FUJIFILM%");
select * from meta_subset;
SELECT m.pid,m.device,l.lat,l.lon FROM meta_subset AS m JOIN loc_subset AS l ON m.pid = l.pid;

DROP TABLE meta_subset, loc_subset;

CREATE TEMPORARY TABLE loc_subset as (SELECT * FROM photo_locations WHERE DISTANCE(points, POINT(-0.104,51.51) ) <=500); CREATE TEMPORARY TABLE meta_subset as (select a.pid,device from photo_locations as a join metadata as b ON a.pid = b.pid where b.device like "FUJIFILM%"); SELECT m.pid,m.device,l.lat,l.lon FROM meta_subset AS m JOIN loc_subset AS l ON m.pid = l.pid;

SELECT m.pid,m.device,l.lat,l.lon,l.points FROM (select a.pid,device from photo_locations as a join metadata as b ON a.pid = b.pid where b.device like "FUJIFILM%") AS m JOIN (SELECT * FROM photo_locations WHERE DISTANCE(points, POINT(-0.104,51.51) ) <=500) AS l ON m.pid = l.pid;

select a.pid,a.lat,a.lon,a.points from photo_locations as a join metadata as b ON a.pid = b.pid where b.device like "FUJIFILM%"

