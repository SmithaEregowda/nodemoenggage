const { validationResult } = require('express-validator');
const FilterList = require('../models/lists')

exports.postList = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation Failed');
            error.statusCode = 422;
            error.data = errors.array()
            throw error
        }

        let userId = req.body.userId;
        let nameoffilter = req.body.name;
        let images = req.body?.images;
        
        const filtersetobj = new FilterList({
            userId: userId,
            nameoffilter: nameoffilter,
            images: images
        })

        const newfiltersetobj = await filtersetobj.save();

        if (!newfiltersetobj) {
            const error = new Error('not able to save filter set,please try again');
            error.statusCode = 400;
            throw error
        }

        res.status(201).json({
            status:200,
            message: "filter set created successfully",
            listdetails: newfiltersetobj
        })

    } catch (err) {
        next(err)
    }

}

exports.getFilterSetByUser = async (req, res, next) => {

    try {
        let userId = req.params.userId;

        if (!userId) {
            const error = new Error('please provide userId');
            error.statusCode = 404;
            throw error
        }
        const filterSetByuser=await FilterList.find({userId:userId}).sort({_id:-1});
        if(!filterSetByuser){
            const error = new Error('Filter set not found for the user');
            error.statusCode = 404;
            throw error 
        }
        res.status(200).json({
            status:200,
            message: "Filter set fetched successfully",
            filtersets: filterSetByuser
        })

    } catch (err) {
        next(err)
    }
}

exports.updateFilterSet = async (req, res, next) => {
    try {
        let listId = req.params.listId;
        
        if (!listId) {
            const error = new Error('Invalid List Id');
            throw error;
        }

        let updatedFilterSet = await FilterList.findByIdAndUpdate(
            listId,
            { ...req.body },
            { new: true }
        );

        if (!updatedFilterSet) {
            const error = new Error('List Not Found');
            error.statusCode = 400;
            throw error
        }


        res.status(200).json({
            message: 'List updated successfully',
            filterset: updatedFilterSet,
            status:200
        });
    } catch (err) {
        next(err)
    }
}

exports.removeFilterSet = async (req, res, next) => {
    try {
        let listId = req.params.listId;
        if (!listId) {
            const error = new Error('Invalid List ID');
            throw error;
        }
       
            let removedList = await FilterList.findByIdAndRemove(listId);

        if (!removedList) {
            const error = new Error('List Not Found');
            error.statusCode = 400;
            throw error
        }


        res.status(200).json({
            message: 'List removed successfully',
            filterset: removedList,
            status:200
        });
    } catch (err) {
        next(err)
    }
}