const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllEmployees = async (req, res) => {
    //#swagger.tags = ['Employees']
    try {
        const result = await mongodb.getDatabase().db().collection('Employees').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch employees', error });
    }
};

const getSingleEmployee = async (req, res) => {
    //#swagger.tags = ['Employees']
    try {
        const employeeId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('Employees').findOne({ _id: employeeId });

        if (!result) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Invalid ID or server error', error });
    }
};

const createEmployee = async (req, res) => {
    //#swagger.tags = ['Employees']
    const employee = {
        name: req.body.name,
        position: req.body.position,
        salary: req.body.salary || 0,
        hireDate: req.body.hireDate,
        storeId: req.body.storeId,
        status: req.body.status || 'Active',
        performanceRating: req.body.performanceRating || 0,
        shiftSchedule: req.body.shiftSchedule || 'Day',
    };

    try {
        const response = await mongodb.getDatabase().db().collection('Employees').insertOne(employee);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Employee created successfully', employeeId: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create employee' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating employee', error });
    }
};

const updateEmployee = async (req, res) => {
    //#swagger.tags = ['Employees']
    try {
        const employeeId = new ObjectId(req.params.id);
        const employee = {
            name: req.body.name,
            position: req.body.position,
            salary: req.body.salary,
            hireDate: req.body.hireDate,
            storeId: req.body.storeId,
            status: req.body.status,
            performanceRating: req.body.performanceRating,
            shiftSchedule: req.body.shiftSchedule,
        };

        const response = await mongodb.getDatabase().db().collection('Employees').updateOne({ _id: employeeId }, { $set: employee });

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Employee updated successfully' });
        } else {
            res.status(404).json({ message: 'Employee not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating employee', error });
    }
};

const deleteEmployee = async (req, res) => {
    //#swagger.tags = ['Employees']
    try {
        const employeeId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('Employees').deleteOne({ _id: employeeId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting employee', error });
    }
};

module.exports = {
    getAllEmployees,
    getSingleEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};