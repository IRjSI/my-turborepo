import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import middleware from "./middleware.js";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());

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
            const user = await prismaClient.user.create({
                data: {
                    name: parsedData.data.name,
                    email: parsedData.data.username,
                    password: parsedData.data.password
                }
            })
            res.json({
                userId: user.id
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

app.post('/signin', async (req,res) => {
    try {
        const parsedData = SigninSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.json({
                message: 'User already exists'
            });
            return;
        }

        try {
            const user = await prismaClient.user.findFirst({
                where: {
                    email: parsedData.data?.username,
                    password: parsedData.data?.password
                }
            })
            if (!user) {
                res.json({
                    message: 'User not found'
                })
                return;
            }

            const token = jwt.sign({ userId: user?.id }, JWT_SECRET);
    
            res.json({
                token: token
            })
        } catch (error) {
            console.log(error);
            res.json({
                message: 'User not found'
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'Error logging-in'
        })
    }
})

app.post('/room', middleware, async (req,res) => {
    try {
        const parsedData = CreateRoomSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.json({
                message: 'User already exists'
            });
            return;
        }
        
        //@ts-ignore
        const userId = req.userId

        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        res.json({
            roomId: room.id
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: 'Error creating room'
        })
    }
})

app.listen(3001);