CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status BOOLEAN,
    userId VARCHAR(100) REFERENCES users(id)
);