import { Request } from "express";
import { EntityManager } from "typeorm";

export interface CustomRequest extends Request {
    entityManager: EntityManager
}