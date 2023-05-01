import { read, write } from '../utils/model.js';

export default {
    GET: (req, res) => {
        const subCategories = read('subcategories');
        const products = read('products');

        subCategories.map(category =>{
            let arr = [];
            products.map(product => {
                if(product.sub_category_id == category.sub_category_id) {
                    delete product.sub_category_id
                    arr.push(product);
                }
            })

            if(arr.length) {
                category.products = arr;
            }
        })
        res.json(200, subCategories);
    },

    POST: async (req, res) => {
        const { sub_category_name, category_id } = await req.body;
        const subCategories = read('subcategories');
        try {
            const newSubCategory = {
                sub_category_id: subCategories.at(-1)?.sub_category_id + 1 || 1,
                category_id,
                sub_category_name
            }
            subCategories.push(newSubCategory);

            write('subcategories', subCategories);
            res.json(200, { status: 201, message: "successfully created!" });
        } catch (error) {
            res.json(400, { status: 400, message: error.message });
        }
    },

    PUT: async (req, res) => {
        const { sub_category_name, sub_category_id, category_id } = await req.body;
        const subCategories = read('subcategories');

        try {
            const filteredSubCat = subCategories.find(c => c.sub_category_id == sub_category_id);

            if(!filteredSubCat) {
                throw new Error('Invalid sub-category id')
            }

            filteredSubCat.sub_category_name = sub_category_name || filteredSubCat.sub_category_name;
            filteredSubCat.category_id = category_id || filteredSubCat.category_id;

            write('subcategories', subCategories);
            res.json(200, { status: 200, message: "successfully updated!" });
        } catch (error) {
            res.json(400, { status: 400, message: error.message });
        }
        
    },

    DELETE: async (req, res) => {
        const { sub_category_id } = await req.body;
        const subCategories = read('subcategories');

        try {
            const subCategoryIndex = subCategories.findIndex(c => c.sub_category_id == sub_category_id);
            if(subCategoryIndex == -1) {
                throw new Error('Invalid sub-category id')
            }
            subCategories.splice(subCategoryIndex, 1);

            write('subcategories', subCategories);
            res.json(200, { status: 200, message: "successfully deleted!" });
        } catch (error) {
            res.json(400, { status: 400, message: error.message });
        }
    }
};