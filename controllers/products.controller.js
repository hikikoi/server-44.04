import { log } from 'console';
import { read, write } from '../utils/model.js';

export default {
    GET: (req, res) => {
        const products = read('products');
        res.json(200, products);
    },

    POST: async (req, res) => {
        const { sub_category_id, model, product_name, color, price } = await req.body;
        const products = read('products');
        try {
            const newProduct = {
                product_id: products.at(-1)?.product_id + 1 || 1,
                sub_category_id,
                model,
                product_name,
                color,
                price
            }
            products.push(newProduct);

            write('products', products);
            res.json(200, { status: 200, message: "successfully created!" });
        } catch (error) {
            res.json(400, { status: 400, message: error.message });
        }
    },

    PUT: async (req, res) => {
        const { product_id, sub_category_id, model, product_name, color, price } = await req.body;
        const products = read('products');

        try {
            const filteredPr = products.find(p => p.product_id == product_id);

            if (!filteredPr) {
                throw new Error('Invalid category')
            }

            filteredPr.sub_category_id = sub_category_id || filteredPr.sub_category_id;
            filteredPr.model = model || filteredPr.model;
            filteredPr.product_name = product_name || filteredPr.product_name;
            filteredPr.color = color || filteredPr.color;
            filteredPr.price = price || filteredPr.price;

            write('products', products);
            res.json(200, { status: 200, message: "successfully updated!" });
        } catch (error) {
            res.json(400, { status: 400, message: error.message });
        }

    },

    DELETE: async (req, res) => {
        const { product_id } = await req.body;
        const products = read('products');

        try {
            const productIndex = products.findIndex(p => p.product_id == product_id);
            if (productIndex == -1) {
                throw new Error('Invalid product')
            }
            products.splice(productIndex, 1);

            write('products', products);
            res.json(200, { status: 200, message: "successfully deleted!" });
        } catch (error) {
            res.json(400, { status: 400, message: error.message });
        }
    }
};