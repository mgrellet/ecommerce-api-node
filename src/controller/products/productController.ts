import {Request, Response} from "express";

export const getProducts = (req: Request, res: Response) => {
    res.send('Products');
}

export const getProductById = (req: Request, res: Response) => {
    res.send('Products '+ req.params.id);
}

export const createProduct = (req: Request, res: Response) => {
    res.send('create product');
}

export const updateProduct = (req: Request, res: Response) => {
    res.send('update product');
}

export const deleteProduct = (req: Request, res: Response) => {
    res.send('delete product');
}