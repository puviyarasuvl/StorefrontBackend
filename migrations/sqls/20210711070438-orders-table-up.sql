CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(100) REFERENCES users(id),
    status VARCHAR(10)
);