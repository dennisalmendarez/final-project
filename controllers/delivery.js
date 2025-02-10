const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllDeliveries = async (req, res) => {
    //#swagger.tags = ['Deliveries']
    try {
        const result = await mongodb.getDatabase().db().collection('Deliveries').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch deliveries', error });
    }
};

const getSingleDelivery = async (req, res) => {
    //#swagger.tags = ['Deliveries']
    try {
        const deliveryId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('Deliveries').findOne({ _id: deliveryId });

        if (!result) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Invalid ID or server error', error });
    }
};

const createDelivery = async (req, res) => {
    //#swagger.tags = ['Deliveries']
    const delivery = {
        orderId: req.body.orderId,
        customerName: req.body.customerName,
        address: req.body.address,
        deliveryDate: req.body.deliveryDate,
        status: req.body.status || 'Pending',
        courier: req.body.courier || 'Standard Service',
        estimatedTime: req.body.estimatedTime || 'N/A',
    };

    try {
        const response = await mongodb.getDatabase().db().collection('Deliveries').insertOne(delivery);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Delivery created successfully', deliveryId: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create delivery' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating delivery', error });
    }
};

const updateDelivery = async (req, res) => {
    //#swagger.tags = ['Deliveries']
    try {
        const deliveryId = new ObjectId(req.params.id);
        const delivery = {
            orderId: req.body.orderId,
            customerName: req.body.customerName,
            address: req.body.address,
            deliveryDate: req.body.deliveryDate,
            status: req.body.status,
            courier: req.body.courier,
            estimatedTime: req.body.estimatedTime,
        };

        const response = await mongodb.getDatabase().db().collection('Deliveries').updateOne({ _id: deliveryId }, { $set: delivery });

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Delivery updated successfully' });
        } else {
            res.status(404).json({ message: 'Delivery not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating delivery', error });
    }
};

const deleteDelivery = async (req, res) => {
    //#swagger.tags = ['Deliveries']
    try {
        const deliveryId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('Deliveries').deleteOne({ _id: deliveryId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Delivery deleted successfully' });
        } else {
            res.status(404).json({ message: 'Delivery not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting delivery', error });
    }
};

module.exports = {
    getAllDeliveries,
    getSingleDelivery,
    createDelivery,
    updateDelivery,
    deleteDelivery,
};