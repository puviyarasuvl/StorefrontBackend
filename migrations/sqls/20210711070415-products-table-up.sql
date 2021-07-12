CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price FLOAT4 NOT NULL,
    category VARCHAR(100)
);