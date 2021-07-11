CREATE TABLE users (
    id VARCHAR(100) PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100),
    password VARCHAR(200),
    role VARCHAR(10)
);