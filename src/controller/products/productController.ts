import { Request, Response } from 'express';
import { db } from '../../db';
import { productsTable } from '../../db/productsSchema';
import { eq } from "drizzle-orm";


export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await db.select().from(productsTable);
        res.status(200).json(products);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).send("Invalid ID");
        }
        const [product] = await db.select().from(productsTable).where(eq(productsTable.id, id));
        if (!product) {
            res.status(404).send('Product not found');
        }
        res.status(200).json(product);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
}

export const createProduct = async (req: Request, res: Response) => {

    try {
        const [products] = await db.insert(productsTable).values(req.body).returning();
        res.status(201).json(products);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updatedFields = req.body;

    try {
        const [product] = await db.update(productsTable).set(updatedFields).where(eq(productsTable.id, id)).returning();
        if (!product) {
            res.status(404).send('Product not found');
        }
        res.status(200).json(product);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }

}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const [deleteProduct] = await db.delete(productsTable).where(eq(productsTable.id, Number(req.params.id))).returning();
        if (deleteProduct) {
            res.status(204).send();
        } else {
            res.status(404).send('Product not found');
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
}