const express = require('express');
const router = express.Router();
const authAdmin = require('../../middleware/authAdmin');

router.post('/', authAdmin, async (req,res) => {
    
})