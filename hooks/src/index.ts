const express = require('express');
const app = express();
const port = 3000;
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});