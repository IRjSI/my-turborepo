import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import middleware from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { JWT_SECRET } from "@repo/backend-common/config";

const app = express();

app.post('/signup', (req,res) => {
    try {
        const data = CreateUserSchema.safeParse(req.body);
        if (!data.success) {
            res.json({
                message: 'User already exists'
            });
            return;
        }
        res.json({
            message: ''
        })
    } catch (error) {
        console.log(error);
    }
})

app.post('/signin', (req,res) => {
    try {
        const data = SigninSchema.safeParse(req.body);
        if (!data.success) {
            res.json({
                message: 'User already exists'
            });
            return;
        }
    } catch (error) {
        
    }
})

app.post('/room', middleware, (req,res) => {
    try {
        const data = CreateRoomSchema.safeParse(req.body);
        if (!data.success) {
            res.json({
                message: 'User already exists'
            });
            return;
        }
    } catch (error) {
        
    }
})

app.listen(3001);