

-- 1. DATABASE CREATION
DROP DATABASE IF EXISTS tourist_db1;
CREATE DATABASE tourist_db1 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tourist_db1;

-- ====================================================================
-- 2. DDL SCHEMA WITH RELATIONAL INTEGRITY & CONSTRAINTS
-- ====================================================================

-- Categories Table
CREATE TABLE categories1 (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- Tourist Places Table
CREATE TABLE tourist_places (
    place_id INT AUTO_INCREMENT PRIMARY KEY,
    place_name VARCHAR(120) NOT NULL,
    city VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    entry_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    distance_km DOUBLE NOT NULL DEFAULT 0.0,
    rating DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    popularity INT NOT NULL DEFAULT 0,
    status VARCHAR(10) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,


    CONSTRAINT fk_places_category 
        FOREIGN KEY (category_id) REFERENCES categories1(category_id)
        ON UPDATE CASCADE 
        ON DELETE RESTRICT,

    -- Integrity Constraints (Guarantees Bad Data CANNOT Enter)
    CONSTRAINT uq_place_in_city UNIQUE (place_name, city),
    CONSTRAINT chk_place_not_empty CHECK (CHAR_LENGTH(TRIM(place_name)) > 0),
    CONSTRAINT chk_city_not_empty CHECK (CHAR_LENGTH(TRIM(city)) > 0),
    CONSTRAINT chk_entry_fee CHECK (entry_fee >= 0.00),
    CONSTRAINT chk_distance CHECK (distance_km >= 0.0),
    CONSTRAINT chk_rating CHECK (rating >= 0.00 AND rating <= 5.00),
    CONSTRAINT chk_popularity CHECK (popularity >= 0),
    CONSTRAINT chk_status CHECK (status IN ('ACTIVE', 'INACTIVE'))
) ENGINE=InnoDB;

-- ====================================================================
-- 3. SPEED INDEXES (Optimizes Engine 2 C++ and Engine 3 Web queries)
-- ====================================================================
CREATE INDEX idx_city ON tourist_places(city);
CREATE INDEX idx_category ON tourist_places(category_id);
CREATE INDEX idx_status ON tourist_places(status);
CREATE INDEX idx_ranking_metrics ON tourist_places(rating DESC, popularity DESC);

-- ====================================================================
-- 4. MASTER CATEGORIES SEEDING (6 Core Classifications)
-- ====================================================================
INSERT INTO categories1 (category_id, category_name) VALUES
(1, 'Beach'),
(2, 'Historical'),
(3, 'Nature'),
(4, 'Temple'),
(5, 'Wildlife'),
(6, 'Hill Station');

-- ====================================================================
-- 5. MASTER TOURIST DESTINATIONS SEEDING (34 Curated Places)
-- Note: Distances are calculated realistically from Hubballi (KLE Tech)
-- ====================================================================
INSERT INTO tourist_places 
(place_name, city, category_id, entry_fee, distance_km, rating, popularity, status)
VALUES
-- --- LOCAL HUBBALLI - DHARWAD REGION ---
('Unkal Lake & Park', 'Hubballi', 3, 10.00, 6.0, 4.30, 82, 'ACTIVE'),
('Chandramouleshwara Temple', 'Hubballi', 4, 0.00, 8.5, 4.50, 78, 'ACTIVE'),
('Nrupatunga Betta Viewpoint', 'Hubballi', 3, 20.00, 10.0, 4.40, 80, 'ACTIVE'),
('Sadhankeri Park & Lake', 'Dharwad', 3, 10.00, 22.0, 4.20, 72, 'ACTIVE'),

-- --- UTTARA KANNADA & COASTAL REGION ---
('Gokarna Om Beach', 'Gokarna', 1, 0.00, 150.0, 4.60, 92, 'ACTIVE'),
('Kudle Beach', 'Gokarna', 1, 0.00, 152.0, 4.50, 88, 'ACTIVE'),
('Murudeshwar Temple & Beach', 'Murudeshwar', 4, 0.00, 185.0, 4.70, 95, 'ACTIVE'),
('Yana Rocks & Caves', 'Kumta', 3, 20.00, 140.0, 4.60, 85, 'ACTIVE'),
('Sathodi Falls', 'Yellapur', 3, 30.00, 75.0, 4.50, 81, 'ACTIVE'),
('Magod Falls', 'Yellapur', 3, 20.00, 80.0, 4.30, 76, 'ACTIVE'),
('Sirsi Marikamba Temple', 'Sirsi', 4, 0.00, 102.0, 4.80, 89, 'ACTIVE'),
('Dandeli River Rafting & Wildlife', 'Dandeli', 5, 250.00, 74.0, 4.60, 94, 'ACTIVE'),
('Ulavi Channabasaveshwara Temple', 'Ulavi', 4, 0.00, 95.0, 4.40, 79, 'ACTIVE'),
('Banavasi Madhukeshwara Temple', 'Banavasi', 2, 0.00, 125.0, 4.60, 83, 'ACTIVE'),

-- --- NORTH KARNATAKA HERITAGE BELT ---
('Virupaksha Temple & Hampi Ruins', 'Hampi', 2, 50.00, 165.0, 4.90, 98, 'ACTIVE'),
('Vijaya Vittala Temple & Stone Chariot', 'Hampi', 2, 50.00, 168.0, 4.90, 99, 'ACTIVE'),
('Badami Cave Temples', 'Badami', 2, 30.00, 105.0, 4.70, 91, 'ACTIVE'),
('Pattadakal UNESCO Monuments', 'Pattadakal', 2, 40.00, 128.0, 4.80, 90, 'ACTIVE'),
('Aihole Historical Complex', 'Aihole', 2, 30.00, 135.0, 4.50, 84, 'ACTIVE'),
('Gol Gumbaz', 'Vijayapura', 2, 25.00, 200.0, 4.60, 87, 'ACTIVE'),
('Chitradurga Fort', 'Chitradurga', 2, 25.00, 205.0, 4.70, 89, 'ACTIVE'),

-- --- MALNAD & CENTRAL KARNATAKA ---
('Jog Falls Viewpoint', 'Shivamogga', 3, 50.00, 160.0, 4.70, 93, 'ACTIVE'),
('Agumbe Sunset Point', 'Shivamogga', 6, 0.00, 240.0, 4.50, 85, 'ACTIVE'),
('Mullayanagiri Peak', 'Chikkamagaluru', 6, 0.00, 275.0, 4.80, 96, 'ACTIVE'),
('Baba Budangiri Shrine & Hills', 'Chikkamagaluru', 6, 0.00, 285.0, 4.40, 86, 'ACTIVE'),
('Kudremukh National Park', 'Chikkamagaluru', 5, 200.00, 310.0, 4.70, 88, 'ACTIVE'),
('Belur Chennakeshava Temple', 'Belur', 2, 0.00, 290.0, 4.80, 92, 'ACTIVE'),
('Halebidu Hoysaleshwara Temple', 'Halebidu', 2, 0.00, 300.0, 4.80, 91, 'ACTIVE'),

-- --- SOUTH KARNATAKA & COAST ---
('Mysore Palace', 'Mysuru', 2, 100.00, 410.0, 4.90, 98, 'ACTIVE'),
('Chamundi Hill & Temple', 'Mysuru', 4, 0.00, 415.0, 4.70, 90, 'ACTIVE'),
('Abbey Falls', 'Madikeri', 3, 50.00, 380.0, 4.50, 87, 'ACTIVE'),
('Raja Seat Viewpoint', 'Madikeri', 6, 25.00, 375.0, 4.40, 84, 'ACTIVE'),
('Malpe Beach & St Mary Island', 'Udupi', 1, 300.00, 250.0, 4.60, 91, 'ACTIVE'),
('Bandipur National Park Safari', 'Bandipur', 5, 350.00, 480.0, 4.70, 94, 'ACTIVE');

-- ====================================================================
-- 6. RELATIONAL VIEWS (For Engine 2 C++ & Engine 3 Web)
-- ====================================================================

-- View 1: Complete Catalog with Category Names
CREATE OR REPLACE VIEW vw_tourist_catalog AS
SELECT 
    p.place_id,
    p.place_name,
    p.city,
    c.category_name,
    p.entry_fee,
    p.distance_km,
    p.rating,
    p.popularity,
    p.status
FROM tourist_places p
JOIN categories1 c ON p.category_id = c.category_id
WHERE p.status = 'ACTIVE';

-- View 2: Formula-Based Ranking View
-- Formula: (0.50 * (Rating/5.0)) + (0.35 * (Popularity/100.0)) - (0.15 * (Distance/500.0))
CREATE OR REPLACE VIEW vw_ranked_tourist_places AS
SELECT 
    p.place_id,
    p.place_name,
    p.city,
    c.category_name,
    p.rating,
    p.popularity,
    p.distance_km,
    p.entry_fee,
    ROUND(
        (0.50 * (p.rating / 5.0)) + 
        (0.35 * (p.popularity / 100.0)) - 
        (0.15 * (LEAST(p.distance_km, 500.0) / 500.0)),
        4
    ) AS ranking_score
FROM tourist_places p
JOIN categories1 c ON p.category_id = c.category_id
WHERE p.status = 'ACTIVE'
ORDER BY ranking_score DESC;

-- View 3: Summary Analytics by Category
CREATE OR REPLACE VIEW vw_category_summary AS
SELECT 
    c.category_name,
    COUNT(p.place_id) AS total_places,
    ROUND(AVG(p.rating), 2) AS average_rating,
    ROUND(AVG(p.entry_fee), 2) AS average_entry_fee,
    ROUND(AVG(p.distance_km), 1) AS average_distance_km
FROM categories1 c
LEFT JOIN tourist_places p ON c.category_id = p.category_id AND p.status = 'ACTIVE'
GROUP BY c.category_id, c.category_name;

-- ====================================================================
-- 7. STORED PROCEDURES (Database-Level Logic)
-- ====================================================================

DELIMITER $$

-- Procedure 1: Multi-Filter Search
DROP PROCEDURE IF EXISTS sp_filter_places$$
CREATE PROCEDURE sp_filter_places(
    IN in_city VARCHAR(100),
    IN in_category VARCHAR(100),
    IN in_max_budget DECIMAL(10,2)
)
BEGIN
    SELECT 
        p.place_id,
        p.place_name,
        p.city,
        c.category_name,
        p.entry_fee,
        p.distance_km,
        p.rating,
        p.popularity
    FROM tourist_places p
    JOIN categories1 c ON p.category_id = c.category_id
    WHERE p.status = 'ACTIVE'
      AND (in_city IS NULL OR in_city = '' OR LOWER(p.city) = LOWER(in_city))
      AND (in_category IS NULL OR in_category = '' OR LOWER(c.category_name) = LOWER(in_category))
      AND (in_max_budget IS NULL OR in_max_budget <= 0 OR p.entry_fee <= in_max_budget)
    ORDER BY p.rating DESC, p.popularity DESC;
END$$

-- Procedure 2: Safe Place Insertion
DROP PROCEDURE IF EXISTS sp_add_place$$
CREATE PROCEDURE sp_add_place(
    IN in_name VARCHAR(120),
    IN in_city VARCHAR(100),
    IN in_category_id INT,
    IN in_fee DECIMAL(10,2),
    IN in_dist DOUBLE,
    IN in_rating DECIMAL(3,2),
    IN in_popularity INT
)
BEGIN
    INSERT INTO tourist_places 
    (place_name, city, category_id, entry_fee, distance_km, rating, popularity, status)
    VALUES 
    (in_name, in_city, in_category_id, in_fee, in_dist, in_rating, in_popularity, 'ACTIVE');
    
    SELECT LAST_INSERT_ID() AS new_place_id, 'Record successfully inserted' AS message;
END$$

DELIMITER ;