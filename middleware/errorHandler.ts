import { Request, Response } from 'express';
import {ApiError} from "./ErrorApi";

export const errorHandler = (error: Error, req: Request, res: Response): void => {
    const err: ApiError = error as ApiError;
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error'
    });
}