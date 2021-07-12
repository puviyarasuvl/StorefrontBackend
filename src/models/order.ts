import pool from '../database';

export type Order = {
    id: number;
    userid: string;
    status: string;
    createddate: string;
};

export type OrderProduct = {
    id: number;
    orderid: number;
    productid: number;
    quantity: number;
};

/* Class to represent the orders table */
export class OrderModel {
    /* method : create. Creates and returns a new order
       input params : user id
       return : Promise<Order> */
    async create(userId: string): Promise<Order> {
        const conn = await pool.connect();
        const status = 'Open';

        try {
            let sql = 'SELECT * FROM orders WHERE userId=$1 AND status=$2';
            let result = await conn.query(sql, [userId, 'Open']);

            if (result.rows.length === 0) {
                const date = new Date().toLocaleString();
                sql =
                    'INSERT INTO orders (userId, status, createdDate) VALUES ($1, $2, $3) RETURNING *';
                result = await conn.query(sql, [userId, status, date]);

                conn.release();
                return result.rows[0];
            } else {
                throw new Error(
                    'Cannot create two open orders(cart) for single user'
                );
            }
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to create new order', err);

            throw err;
        }
    }

    /* method : index. Returns all the avilable orders
       input params :
       return : Promise<Order []> */
    async index(): Promise<Order[]> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to fetch the orders', err);

            throw err;
        }
    }

    /* method : show. Returns the order details based on the order id
       input params : order id
       return : Promise<Order> */
    async show(orderId: number): Promise<Order> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM orders WHERE id=$1';
            const result = await conn.query(sql, [orderId]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to fetch the order details', err);

            throw err;
        }
    }

    /* method : update. Updates the status information in the order id
       input params : Order id, status
       return : Promise<Order> */
    async update(orderId: number, status: string): Promise<Order> {
        const conn = await pool.connect();

        try {
            const sql = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *';
            const result = await conn.query(sql, [status, orderId]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to update the order details', err);

            throw err;
        }
    }

    /* method : addProduct. Adds the given product details into the order
       input params : Order id, Product id, quantity
       return : Promise<OrderProducts> */
    async addProduct(
        orderId: number,
        productId: number,
        quantity: number
    ): Promise<OrderProduct> {
        const conn = await pool.connect();

        try {
            let sql = 'SELECT * FROM orders WHERE id=$1';
            let result = await conn.query(sql, [orderId]);

            // Add products to the order only if the order status is Open
            if (result.rows.length && result.rows[0].status === 'Open') {
                sql =
                    'INSERT INTO order_products (orderId, productId, quantity) VALUES ($1, $2, $3) RETURNING *';
                result = await conn.query(sql, [orderId, productId, quantity]);

                conn.release();
                return result.rows[0];
            } else {
                throw new Error('Order not found or order is not open');
            }
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to add the product details into order', err);

            throw err;
        }
    }
}
