const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

db.serialize(() => {
    db.run(`CREATE TABLE TimeTrials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    track_id INTEGER,
    character TEXT,
    lap1 TEXT,
    lap2 TEXT,
    lap3 TEXT,
    final_time TEXT,
    notes TEXT
  )`)
})

module.exports = db
