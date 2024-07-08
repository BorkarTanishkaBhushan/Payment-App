const express = require('express');
const router = express.Router();
const zod = require('zod');
const { authMiddleware } = require('../middleware/middleware');
const { Account } = require('../db/model');
const mongoose = require('mongoose');  

router.get('/balance', authMiddleware, async(req, res) => {

    try{
        const account = await Account.findOne({userId: req.userId})
        res.status(200).json({
            balance: account.balance
        })
    }catch(err){
        res.status(500).json({
            message: 'Internal server error ' + err.message
        })
    }
})

const transferSchema = zod.object({
    to: zod.string(),
    amount: zod.string()
})

router.post("/transfer", authMiddleware, async(req, res) => {
    const success = transferSchema.safeParse(req.body)
    if(!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    const {to, amount} = req.body
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });

})

module.exports = router