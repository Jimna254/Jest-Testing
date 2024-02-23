CREATE TABLE Users (
    user_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255)  NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    cohort_number VARCHAR(255),
    phone_number VARCHAR(255),
    password VARCHAR(255) NOT NULL
);

ALTER TABLE Users
ADD isdeleted BIT DEFAULT 0;