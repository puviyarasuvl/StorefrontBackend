CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    orderId INTEGER REFERENCES orders(id),
    productId INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1
);