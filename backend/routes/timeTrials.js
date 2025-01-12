const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/', (req, res) => {
    const { date, track_id, character, lap1, lap2, lap3, final_time, notes } = req.body
    db.run(`INSERT INTO TimeTrials (date, track_id, character, lap1, lap2, lap3, final_time, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [date, track_id, character, lap1, lap2, lap3, final_time, notes], function (err) {
        if (err) {
            return res.status(500).send(err.message)
        }
        res.status(201).json({ id: this.lastID })
    })
})

router.get('/', (req, res) => {
    db.all(`SELECT * FROM TimeTrials`, [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message)
        }
        res.json(rows)
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { date, track_id, character, lap1, lap2, lap3, final_time, notes } = req.body
    db.run(`UPDATE TimeTrials SET date = ?, track_id = ?, character = ?, lap1 = ?, lap2 = ?, lap3 = ?, final_time = ?, notes = ? WHERE id = ?`, [date, track_id, character, lap1, lap2, lap3, final_time, notes, id], function (err) {
        if (err) {
            return res.status(500).send(err.message)
        }
        res.sendStatus(204)
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db.run(`DELETE FROM TimeTrials WHERE id = ?`, [id], function (err) {
        if (err) {
            return res.status(500).send(err.message)
        }
        res.sendStatus(204)
    })
})

module.exports = router
