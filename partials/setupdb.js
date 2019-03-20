const chalk = require('chalk')
const mysql = require('mysql')
require('dotenv').config()

var db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

db.connect(err => {
  if (err) throw err
  console.log(chalk.green('[MySql] connection established..'))
})

function createDb () {
  return new Promise((resolve, reject) => {
    db.query('CREATE DATABASE IF NOT EXISTS aPollo', (err, result) => {
      if (err) {
        reject(err)
      } else {
        console.log(chalk.yellow('[MySql] Database created'))
        resolve()
      }
    })
  })
}

function createTable () {
  return new Promise((resolve, reject) => {
    db.query(`CREATE TABLE IF NOT EXISTS aPollo.polls(id int NOT NULL AUTO_INCREMENT, question VARCHAR(255), option1title VARCHAR(255), option1value INT, option2title VARCHAR(255), option2value INT, option3title VARCHAR(255), option3value INT, option4title VARCHAR(255), option4value INT, option5title VARCHAR(255), option5value INT, option6title VARCHAR(255), option6value INT, option7title VARCHAR(255), option7value INT, option8title VARCHAR(255), option8value INT, option9title VARCHAR(255), option9value INT, option10title VARCHAR(255), option10value INT, PRIMARY KEY(id))`, (err, result) => {
      if (err) {
        reject(err)
      } else {
        console.log(chalk.yellow(`[MySql] polls table created`))
        resolve()
      }
    })
  })
}

Promise.all([
  createDb(),
  createTable()
])
  .then(() => {
    console.log(chalk.green('[MySql] Database set up succesfully'))
    db.end()
  })
  .catch(err => {
    console.error(err)
    db.query('DROP DATABASE windsurfStatistics', (error, result) => {
      if (error) {
        console.log(chalk.red('Database could not be reset'))
        throw error
      } else {
        console.log(chalk.yellow('Database was reset because of the following error:'))
        throw err
      }
    })
  })
