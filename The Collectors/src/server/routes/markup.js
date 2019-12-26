import express from "express";
import markup from "../models/markup";

const markupRouter = express.Router();

markupRouter.get('/', async (req, res) => {
    const markups = await markup.findAll({})
    return res.json(markups);
})

markupRouter.post('/', async (req, res) => {
    const title = req.body.title;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const userId = req.body.userId;
    const markupDetails = {
        title,
        latitude,
        longitude,
        userId
    }
    try {
        await markup.save(markupDetails)
    } catch (error) {
        console.log(error);
        return res.json({success: false});
    }
    
    return res.json({success: true});
})

export default markupRouter;