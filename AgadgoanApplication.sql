Create database AgadgoanApplication;

use AgadgoanApplication;

drop database AgadgoanApplication;

show tables;

select * from pangat_booking;


select * from devotees;

select * from darshan_booking;
select * from prasad_booking;

-- Devotee Table
CREATE TABLE Devotees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    mobile VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Darshan Bookings
CREATE TABLE DarshanBookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    devotee_id INT,
    name VARCHAR(100),
    mobile VARCHAR(15),
    email VARCHAR(100),
    date DATE,
    timeSlot VARCHAR(50),
    numberOfPeople INT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (devotee_id) REFERENCES Devotees(id) ON DELETE SET NULL
);

-- Pangat Bookings
CREATE TABLE PangatBookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    devotee_id INT,
    name VARCHAR(100),
    mobile VARCHAR(15),
    email VARCHAR(100),
    date DATE,
    timeSlot VARCHAR(50),
    numberOfPeople INT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (devotee_id) REFERENCES Devotees(id) ON DELETE SET NULL
);

-- Prasad Bookings
CREATE TABLE PrasadBookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    devotee_id INT,
    name VARCHAR(100),
    mobileNumber VARCHAR(15),
    date DATE,
    timeSlot VARCHAR(50),
    noOfPeople INT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (devotee_id) REFERENCES Devotees(id) ON DELETE SET NULL
);
