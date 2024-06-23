import express from 'express';

const router = express.Router();

router.post('/send', (req, res) => {
    res.render('home', { datas: req.body });
})