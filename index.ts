import express, { NextFunction } from 'express';
import { CustomRequest } from './customRequest';
import { DataSourceManger } from './dbconfig';
import { MainRouter } from './router';

const EntityManager = (req: CustomRequest, res: any, next: NextFunction) => {
    req.entityManager = DataSourceManger.manager

    next()
}

const app = express()
app.use(EntityManager);
app.use(express.json())

app.use("/api", MainRouter)

DataSourceManger.initialize().then(() => {
    app.listen(3000, () => {
        console.log("literning on port 3000")
    })
}).catch((err) => {
    console.error(err)
})
