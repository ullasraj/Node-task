import express, { Response } from 'express';
import { CustomRequest } from './customRequest';
import { Orders } from './Entity/orders';
import { EntityManager } from 'typeorm';
import { Balance } from './Entity/balance';

const router = express.Router();


const handleUserBalance = async (txnEntityManager: EntityManager, user_id: number, currency_symbol: string, order_type: string, price: number, quantity: number) => {

    let balanceData = await txnEntityManager.getRepository(Balance).findOne({ where: { user_id, currency_symbol } });
    if (!balanceData) {
        balanceData = new Balance()
        balanceData.balance = 0
        balanceData.user_id = user_id
        balanceData.currency_symbol = currency_symbol
    }

    if (order_type === 'buy') {
        balanceData.balance = balanceData.balance + quantity * price
    } else {
        balanceData.balance = balanceData.balance - quantity * price
    }

    await txnEntityManager.save(balanceData);
}

router.post("/placeOrder", async (req: CustomRequest, res: Response) => {
    const { user_id, order_type, currency_symbol, price, quantity, status } = req.body;

    if (!user_id || !order_type || !currency_symbol || !price || !quantity || !status) {
        res.status(400).send("Provide correct Order Details")
    }

    const database = req.entityManager;
    const response = await database.transaction(async txnEntityManager => {

        let order = await txnEntityManager.getRepository(Orders).findOne({ where: { user_id, currency_symbol, price, status: status } });
        if (!order) {
            order = new Orders()
            order.order_type = order_type;
            order.user_id = user_id
            order.currency_symbol = currency_symbol
            order.price = price
            order.quantity = quantity;
            order.status = status
        } else {
            order.quantity += quantity
        }

        await txnEntityManager.save(order);

        await handleUserBalance(txnEntityManager, user_id, currency_symbol, order_type, price, quantity)
        return order
    })




    res.status(200).send(response)

})

export { router as MainRouter }