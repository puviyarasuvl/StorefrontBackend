CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    orderId BIGINT REFERENCES orders(id),
    productIds BIGINT
);