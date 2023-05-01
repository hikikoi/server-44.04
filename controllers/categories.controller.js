import { read, write } from '../utils/model.js';

export default {
    GET: (req, res) => {
        const categories = read('categories');
        const subCategories = read('subcategories');

        categories.map(category =>{
            let arr = [];
            subCategories.map(subCategory => {
                if(subCategory.category_id == category.category_id) {
                    delete subCategory.category_id
                    arr.push(subCategory);
                }
            })

            if(arr.length) {
                category.subcategories = arr;
            }
        })
        res.json(200, categories);
    },

    POST: async (req, res) => {
        const { category_name } = await req.body;
        const categories = read('categories');
        try {
            const newCategory = {
                category_id: categories.at(-1)?.category_id + 1 || 1,
                category_name
            }
            categories.push(newCategory);

            write('categories', categories);
            res.json(200, { status: 200, message: "successfully created!" });
        } catch (error) {
            res.json(400, { status: 400, message: error.message });
        }
    },

    PUT: async (req, res) => {
        const { category_id, category_name } = await req.body;
        const categories = read('categories');

        try {
            const filteredCat = categories.find(c => c.category_id == category_id);

            if(!filteredCat) {
                throw new Error('Invalid category')
            }

            filteredCat.category_name = category_name || filteredCat.category_name;

            write('categories', categories);
            res.json(200, { status: 200, message: "successfully updated!" });
        } catch (error) {
            res.json(400, { status: 400, message: error.message });
        }
        
    },

    DELETE: async (req, res) => {
        const { category_id } = await req.body;
        const categories = read('categories');

        try {
            const categoryIndex = categories.findIndex(c => c.category_id == category_id);
            if(categoryIndex == -1) {
                throw new Error('Invalid category')
            }
            categories.splice(categoryIndex, 1);

            write('categories', categories);
            res.json(200, { status: 200, message: "successfully deleted!" });
        } catch (error) {
            res.json(400, { status: 400, message: error.message });
        }
    }
};