import { Request, Response } from 'express';
import { licenses } from '../../models/licenses';

const controller = (req: Request, res: Response) => {
    res.json({ licenses });
};

export default controller;
