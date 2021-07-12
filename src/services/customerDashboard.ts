import pool from '../database';

export type OrderDetails = {
    userId: string;
    orderId: number;
    orderStatus: string;
    createdDate: string;
    products: [
        {
            productId: number;
            quantity: number;
        }
    ];
};

interface Product {
    productId: number;
    quantity: number;
}

interface Order {
    orderId: number;
    orderStatus: string;
    createdDate: string;
    products: Product[];
}

export interface CompletedOrderDetails {
    userId: string;
    orders: Order[];
}

/* Class to represent dashboard methods related to customer */
export class CustomerDashboard {
    /* method : currentOrder. Returns the current open order for the customer
       input params : user id
       return : Promise<OrderDetails> */
    async currentOrder(userId: string): Promise<OrderDetails> {
        const conn = await pool.connect();

        try {
            const sql =
                'SELECT userId, orderId, status, productId, quantity, createdDate FROM orders INNER JOIN order_products on orders.id=order_products.orderid WHERE userId=$1 AND status=$2';
            const result = await conn.query(sql, [userId, 'Open']);

            if (result.rows.length) {
                let currentOrder: OrderDetails = {
                    userId: result.rows[0].userid,
                    orderId: result.rows[0].orderid,
                    orderStatus: result.rows[0].status,
                    createdDate: result.rows[0].createddate,
                    products: [
                        {
                            productId: result.rows[0].productid,
                            quantity: result.rows[0].quantity,
                        },
                    ],
                };

                for (let i = 1; i < result.rows.length; i++) {
                    currentOrder.products.push({
                        productId: result.rows[i].productid,
                        quantity: result.rows[i].quantity,
                    });
                }

                conn.release();
                return currentOrder;
            } else {
                throw new Error('No open order found for the user');
            }
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to get the open order for the user', err);

            throw err;
        }
    }

    /* method : completedOrders. Returns the completed orders for the customer
       input params : user id
       return : Promise<OrderDetails[]> */
    async completedOrders(userId: string): Promise<CompletedOrderDetails> {
        const conn = await pool.connect();

        try {
            const sql =
                'SELECT userId, orderId, status, productId, quantity, createdDate FROM orders INNER JOIN order_products on orders.id=order_products.orderid WHERE userId=$1 AND status!=$2';
            const result = await conn.query(sql, [userId, 'Open']);

            if (result.rows.length) {
                let order: Order = {
                    orderId: result.rows[0].orderid,
                    orderStatus: result.rows[0].status,
                    createdDate: result.rows[0].createddate,
                    products: [
                        {
                            productId: result.rows[0].productid,
                            quantity: result.rows[0].quantity,
                        },
                    ],
                };

                let completedOrders: CompletedOrderDetails = {
                    userId: result.rows[0].userid,
                    orders: [order],
                };

                let added = true;

                for (let i = 1; i < result.rows.length; i++) {
                    added = false;
                    for (let j = 0; j < completedOrders.orders.length; j++) {
                        if (
                            completedOrders.orders[j].orderId ===
                            result.rows[i].orderid
                        ) {
                            completedOrders.orders[j].products.push({
                                productId: result.rows[i].productid,
                                quantity: result.rows[i].quantity,
                            });

                            added = true;
                        }
                    }
                    if (!added) {
                        completedOrders.orders.push({
                            orderId: result.rows[i].orderid,
                            orderStatus: result.rows[i].status,
                            createdDate: result.rows[i].createddate,
                            products: [
                                {
                                    productId: result.rows[i].productid,
                                    quantity: result.rows[i].quantity,
                                },
                            ],
                        });
                    }
                }

                return completedOrders;
            } else {
                throw new Error('No closed orders found for the user');
            }
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to get the closed orders for the user', err);

            throw err;
        }
    }
}
