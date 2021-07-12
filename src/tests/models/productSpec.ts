import { Product, ProductModel } from '../../models/product';

const productModel = new ProductModel();

const newProduct: Product = {
    id: 1,
    name: 'Samsung M31',
    price: 15000.0,
    category: 'Mobiles',
};

const newProduct2: Product = {
    id: 2,
    name: 'HP Elitebook',
    price: 75000.0,
    category: 'PC',
};

const newProduct3: Product = {
    id: 3,
    name: 'Apple iPhone 10',
    price: 60000.0,
    category: 'Mobiles',
};

describe('Testing Product Model', () => {
    describe('create method', () => {
        it('should successfully add the product to database and return the added product', async () => {
            let result = await productModel.create(newProduct);
            expect(result).toEqual(newProduct);

            result = await productModel.create(newProduct2);
            expect(result).toEqual(newProduct2);

            result = await productModel.create(newProduct3);
            expect(result).toEqual(newProduct3);
        });
    });

    describe('index method', () => {
        it('should return all availale products', async () => {
            const result = await productModel.index();

            expect(result.length).toEqual(3);
            expect(result).toEqual([newProduct, newProduct2, newProduct3]);
        });
    });

    describe('show method', () => {
        it('should return the product details based on the given id', async () => {
            let result = await productModel.show(1);
            expect(result).toEqual(newProduct);

            result = await productModel.show(2);
            expect(result).toEqual(newProduct2);
        });

        it('should return nothing if invalid product is passed', async () => {
            let result = await productModel.show(12);
            expect(result).toBeUndefined;
        });
    });

    describe('delete method', () => {
        it('should successfully delete the product from db', async () => {
            const result = await productModel.delete(1);
            expect(result).toEqual(1);

            const result1 = await productModel.index();
            expect(result1.length).toEqual(2);
        });

        it('should return 0 as row count if invalid product id passed', async () => {
            const result = await productModel.delete(10);
            expect(result).toEqual(0);
        });
    });

    describe('productsByCategory', () => {
        it('should return the products for given category', async () => {
            const result = await productModel.productsByCategory('Mobiles');
            expect(result.length).toEqual(1);
            expect(result[0]).toEqual(newProduct3);
        });
    });
});
