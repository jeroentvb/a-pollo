const mysql = require('mysql')
const chalk = require('chalk')

require('dotenv').config()

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

let database

function init () {
  console.log(chalk.green('[MySql] trying to connect..'))

  database = mysql.createConnection(dbConfig)

  database.connect(err => {
    if (err) {
      console.error('[MySql] error while connecting to the db:', err)
      setTimeout(init, 10000)
    } else {
      console.log(chalk.green('[MySql] connection established..'))
    }
  })

  // Handle db errors
  database.on('error', err => {
    console.error('[MySql] db error:', err)

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      init()
    } else {
      throw err
    }
  })
}

function query (query, params) {
  return new Promise((resolve, reject) => {
    database.query(query, params, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

function fetchPollData (id) {
  return new Promise(async (resolve, reject) => {
    const result = await query('SELECT * FROM aPollo.polls WHERE id = ?', id)
    if (!result[0] || !result) return reject(new Error(`There is no poll with id: ${id}`))

    resolve({
      id: id,
      question: result[0].question,
      options: [
        {
          title: result[0].option1title,
          value: result[0].option1value
        },
        {
          title: result[0].option2title,
          value: result[0].option2value
        },
        {
          title: result[0].option3title,
          value: result[0].option3value
        },
        {
          title: result[0].option4title,
          value: result[0].option4value
        },
        {
          title: result[0].option5title,
          value: result[0].option5value
        },
        {
          title: result[0].option6title,
          value: result[0].option6value
        },
        {
          title: result[0].option7title,
          value: result[0].option7value
        },
        {
          title: result[0].option8title,
          value: result[0].option8value
        },
        {
          title: result[0].option9title,
          value: result[0].option9value
        },
        {
          title: result[0].option10title,
          value: result[0].option10value
        }
      ]
    })
  })
}

function getPollData (id, url) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await fetchPollData(id)
      data.url = url || undefined
      data.total = 0

      data.options.forEach(option => {
        if (option.value) data.total += option.value
      })

      data.options.forEach(option => {
        if (option.value) {
          option.percentage = Math.round((option.value / data.total * 100) * 100) / 100
        }
      })

      resolve(data)
    } catch (err) {
      console.error(err)
      reject(err)
    }
  })
}

module.exports = {
  init,
  query,
  getPollData
}
