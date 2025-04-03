import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import middleware from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const app = express();

app.post('/signup', async (req,res) => {
    try {
        const parsedData = CreateUserSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.json({
                message: 'Invalid creds'
            });
            return;
        }

        try {
            await prismaClient.user.create({
                data: {
                    name: parsedData.data.name,
                    email: parsedData.data.username,
                    password: parsedData.data.password
                }
            })
            res.json({
                message: ''
            })
        } catch (error) {
            console.log(error);
            res.json({
                message: "User already exists"
            })
        }
        
    } catch (error) {
        console.log(error);
        res.json({
            message: "Error signing-up"
        })
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