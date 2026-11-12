
DROP DATABASE IF EXISTS tourist_db1;
CREATE DATABASE tourist_db1;
USE tourist_db1;

-- ========================================================
-- STEP 2: CREATE THE CATEGORIES TABLE
-- ========================================================
CREATE TABLE categories1 (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================================
-- STEP 3: CREATE THE TOURIST PLACES TABLE
-- ========================================================
CREATE TABLE tourist_places (
    place_id INT AUTO_INCREMENT PRIMARY KEY,
    place_name VARCHAR(120) NOT NULL,
    city VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    entry_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    distance_km DOUBLE NOT NULL DEFAULT 0.0,
    rating DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    popularity INT NOT NULL DEFAULT 0,
    status VARCHAR(10) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Foreign Key (Links to categories1 table)
    FOREIGN KEY (category_id) REFERENCES categories1(category_id),

    -- Integrity Checks (Prevents bad data)
    CONSTRAINT uq_place_city UNIQUE (place_name, city),
    CHECK (entry_fee >= 0),
    CHECK (distance_km >= 0),
    CHECK (rating BETWEEN 0 AND 5),
    CHECK (popularity >= 0),
    CHECK (status IN ('ACTIVE', 'INACTIVE'))
);

-- ========================================================
-- STEP 4: INSERT CATEGORIES
-- ========================================================
INSERT INTO categories1 (category_name) VALUES
('Beach'),
('Historical'),
('Nature'),
('Temple'),
('Wildlife'),
('Hill Station');

-- ========================================================
-- STEP 5: INSERT TOURIST DESTINATIONS
-- ========================================================
INSERT INTO tourist_places 
(place_name, city, category_id, entry_fee, distance_km, rating, popularity)
VALUES
('Unkal Lake & Park', 'Hubballi', 3, 10.00, 6.0, 4.30, 82),
('Chandramouleshwara Temple', 'Hubballi', 4, 0.00, 8.5, 4.50, 78),
('Nrupatunga Betta Viewpoint', 'Hubballi', 3, 20.00, 10.0, 4.40, 80),
('Sadhankeri Park & Lake', 'Dharwad', 3, 10.00, 22.0, 4.20, 72),
('Gokarna Om Beach', 'Gokarna', 1, 0.00, 150.0, 4.60, 92),
('Murudeshwar Temple & Beach', 'Murudeshwar', 4, 0.00, 185.0, 4.70, 95),
('Jog Falls Viewpoint', 'Shivamogga', 3, 50.00, 160.0, 4.70, 93),
('Virupaksha Temple & Hampi', 'Hampi', 2, 50.00, 165.0, 4.90, 98),
('Badami Cave Temples', 'Badami', 2, 30.00, 105.0, 4.70, 91),
('Mysore Palace', 'Mysuru', 2, 100.00, 410.0, 4.90, 98),
('Dandeli River Rafting', 'Dandeli', 5, 250.00, 74.0, 4.60, 94),
('Mullayanagiri Peak', 'Chikkamagaluru', 6, 0.00, 275.0, 4.80, 96);

-- ========================================================
-- STEP 6: VIEW THE RESULT TABLE
-- ========================================================
SELECT * FROM tourist_places;