import pool from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
};

/* Class to represent the products table */
export class ProductModel {
    /* method : create. Creates a new product using the given details and returns created product
       input params : Product
       return : Promise<Product> */
    async create(newProduct: Product): Promise<Product> {
        const conn = await pool.connect();

        try {
            const sql =
                'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [
                newProduct.name,
                newProduct.price,
                newProduct.category,
            ]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to insert product into db', err);

            throw err;
        }
    }

    /* method : index. Returns all the products information.
       input params :
       return : Promise<Product []> */
    async index(): Promise<Product[]> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to fetch the products', err);

            throw err;
        }
    }

    /* method : show. Returns the product information based on given product id
       input params : product id
       return : Promise<Product> */
    async show(productId: number): Promise<Product> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM products WHERE id=$1';
            const result = await conn.query(sql, [productId]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to fetch the product information', err);

            throw err;
        }
    }

    /* method : delete. Deletes the product information based on given product id
       input params : product id
       return : Promise<number>. Returns the no of deleted rows */
    async delete(productId: number): Promise<number> {
        const conn = await pool.connect();

        try {
            const sql = 'DELETE FROM products WHERE id=$1';
            const result = await conn.query(sql, [productId]);

            conn.release();
            return result.rowCount;
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to delete the product information', err);

            throw err;
        }
    }

    /* method : productsByCategory. Returns the product details for given category
       input params : product category
       return : Promise<Product[]> */
    async productsByCategory(category: string): Promise<Product[]> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM products WHERE category=$1';
            const result = await conn.query(sql, [category]);

            conn.release();
            return result.rows;
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log(
                'Failed to fetch the product details for given category',
                err
            );

            throw err;
        }
    }
}
