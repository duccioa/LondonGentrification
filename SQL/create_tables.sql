# Create tables
CREATE TABLE `LondonBoroughs` (
`borough_code` varchar(255) NOT NULL,
`borough_name` varchar(255) null,
`poly` geometry null,
`area_m` bigint(11) null,
`area_km` float null
) ENGINE=InnoDB; 
ALTER TABLE `ucfnszh`.`LondonBoroughs` 
ADD PRIMARY KEY (`borough_code`);

CREATE TABLE `tokens_spatial`(
`BusinessID` int default null,
`BusinessName` varchar(255) default null,
`BusinessType` varchar(255) default null,
`BusinessTypeID` bigint(11) default null,
`ConfidenceInManagement` float default null,
`Hygiene` float default null,
`LocalAuthorityCode` varchar(255) default null,
`LocalAuthorityName` varchar(255) default null,
`PostCode` varchar(255) default null,
`RatingValue` int default null,
`structural` float default null,
`Token` varchar(255) default null,
`lat` float default null,
`lon` float default null

) ENGINE=InnoDB default charset=utf8;


CREATE TABLE `LondonWards` (
  `ward_code` VARCHAR(255) NOT NULL,
  `ward_name` VARCHAR(255) NULL,
  `poly` GEOMETRY NULL,
  `area_m` FLOAT NULL,
  `area_km` FLOAT NULL,
  PRIMARY KEY (`ward_code`))
ENGINE = InnoDB;

# Load data ionto the tables
load data local infile '/Users/duccioa/CLOUD/C07_UCL_SmartCities/04_SpatialDataCapture/00_Coursework/LondonGentrification/Data/ShapesPython/london_boroughs.csv' 
into table LondonBoroughs fields terminated by ',' enclosed by '"' lines terminated by '\n' ignore 1 lines (borough_code, borough_name, @var3, area_m, area_km) set poly=PolyFromText(@var3);

load data local infile '/Users/duccioa/CLOUD/C07_UCL_SmartCities/04_SpatialDataCapture/00_Coursework/LondonGentrification/Data/ShapesPython/london_wards.csv' 
into table LondonWards fields terminated by ',' enclosed by '"' lines terminated by '\n' ignore 1 lines (ward_code, ward_name, @var3, area_m, area_km) set poly=PolyFromText(@var3);

load data local infile '/Users/duccioa/CLOUD/C07_UCL_SmartCities/04_SpatialDataCapture/00_Coursework/LondonGentrification/Data/FoodPremises/tokens_spatial.csv' 
into table tokens_spatial fields terminated by ',' enclosed by '"' lines terminated by '\n' ignore 1 lines;



ALTER TABLE tokens_spatial
ADD COLUMN points GEOMETRY NULL AFTER lon;

UPDATE tokens_spatial 
SET points = Point(lon, lat);
