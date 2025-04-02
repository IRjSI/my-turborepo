import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import middleware from "./middleware";

const app = express();

//@ts-ignore
app.post('/signup', (req,res) => {
    try {
        const { name, email, password } = req.body;
        const existing = ""
        if (existing) {
            return res.json({
                message: 'User already exists'
            })
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
        
    } catch (error) {
        
    }
})

app.post('/room', middleware, (req,res) => {
    try {
        
    } catch (error) {
        
    }
})

app.listen(3001);