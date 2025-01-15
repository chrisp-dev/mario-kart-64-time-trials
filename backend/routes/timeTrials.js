const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post('/', async (req, res) => {
    const { date, track_id, character, lap1, lap2, lap3, final_time, notes } = req.body
    try {
        const newTimeTrial = await prisma.timeTrials.create({
            data: { date, track_id, character, lap1, lap2, lap3, final_time, notes }
        })
        res.status(201).json({ id: newTimeTrial.id })
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/', async (req, res) => {
    try {
        const timeTrials = await prisma.timeTrials.findMany()
        res.json(timeTrials)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { date, track_id, character, lap1, lap2, lap3, final_time, notes } = req.body
    try {
        await prisma.timeTrials.update({
            where: { id: parseInt(id) },
            data: { date, track_id, character, lap1, lap2, lap3, final_time, notes }
        })
        res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await prisma.timeTrials.delete({
            where: { id: parseInt(id) }
        })
        res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router
