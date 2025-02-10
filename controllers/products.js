const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllProducts = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const result = await mongodb.getDatabase().db().collection('Products').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error });
    }
};

const getSingleProduct = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const productId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('Products').findOne({ _id: productId });

        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Invalid ID or server error', error });
    }
};

const createProduct = async (req, res) => {
    //#swagger.tags = ['Products']
    const product = {
        name: req.body.name,
        description: req.body.description || '',
        price: req.body.price || 0,
        category: req.body.category,
        stock: req.body.stock || 0,
        storeId: req.body.storeId,
        isAvailable: req.body.isAvailable || true,
    };

    try {
        const response = await mongodb.getDatabase().db().collection('Products').insertOne(product);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Product created successfully', productId: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create product' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating product', error });
    }
};

const updateProduct = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const productId = new ObjectId(req.params.id);
        const product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            storeId: req.body.storeId,
            isAvailable: req.body.isAvailable,
        };

        const response = await mongodb.getDatabase().db().collection('Products').updateOne({ _id: productId }, { $set: product });

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ message: 'Product not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating product', error });
    }
};

const deleteProduct = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const productId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('Products').deleteOne({ _id: productId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting product', error });
    }
};

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};