const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Stores']
    try {
        const result = await mongodb.getDatabase().db().collection('Stores').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch store', error });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Stores']
    try {
        const storeId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('Stores').findOne({ _id: storeId });

        if (!result) {
            return res.status(404).json({ message: 'Store not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Invalid ID or server error', error });
    }
};

const createStore = async (req, res) => {
    //#swagger.tags = ['Stores']
    const store = {
        name: req.body.name,
        description: req.body.description || '',
        openingDate: req.body.openingDate,
        daysOfWeekStoreIsClose: req.body.daysOfWeekStoreIsClose || 'Sunday',
        status: req.body.status || 'Operating',
        NumOfEmployees: req.body.NumOfEmployees || 0,
        NumOfManagers: req.body.NumOfManagers || 0,
        popularityInArea: req.body.popularityInArea || 0,
        anualSales: req.body.anualSales || 0,
        averageCustomerPerAge: req.body.averageCustomerPerAge || 0,
        deliveryService: req.body.deliveryService,
    };

    try {
        const response = await mongodb.getDatabase().db().collection('Stores').insertOne(store);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Store created successfully', storeId: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create store' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating store', error });
    }
};

const updateStore = async (req, res) => {
    //#swagger.tags = ['Stores']
    try {
        const storeId = new ObjectId(req.params.id);
        const store = {
            name: req.body.name,
            description: req.body.description,
            openingDate: req.body.openingDate,
            daysOfWeekStoreIsClose: req.body.daysOfWeekStoreIsClose,
            status: req.body.status,
            NumOfEmployees: req.body.NumOfEmployees,
            NumOfManagers: req.body.NumOfManagers,
            popularityInArea: req.body.popularityInArea,
            anualSales: req.body.anualSales,
            averageCustomerPerAge: req.body.averageCustomerPerAge,
            deliveryService: req.body.deliveryService,
        };

        const response = await mongodb.getDatabase().db().collection('Stores').updateOne({ _id: storeId }, { $set: store });

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Store updated successfully' });
        } else {
            res.status(404).json({ message: 'Store not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating store', error });
    }
};

const deleteStore = async (req, res) => {
    //#swagger.tags = ['Stores']
    try {
        const storeId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('Stores').deleteOne({ _id: storeId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Store deleted successfully' });
        } else {
            res.status(404).json({ message: 'Store not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting store', error });
    }
};

module.exports = {
    getAll,
    getSingle,
    createStore,
    updateStore,
    deleteStore,
};