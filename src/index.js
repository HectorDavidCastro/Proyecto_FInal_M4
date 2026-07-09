import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`servidor corriendo en http://localhost:${PORT}`);
});