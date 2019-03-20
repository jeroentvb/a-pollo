const app = require('express')
const bodyParser = require('body-parser')
const chalk = require('chalk')

const db = require('./partials/db')

require('dotenv').config()

db.init()

app()
  .set('view engine', 'ejs')
  .set('views', 'templates')
  .use(app.static('static'))
  .use(bodyParser.urlencoded({ extended: true }))

  .get('/', render)
  .get('/poll', render)
  .post('/more-options', moreOptions)
  .post('/create-poll', createPoll)

  .get('/poll/:id', renderPoll)
  .post('/submit-answer/:id', submitAnswer)
  .get('/poll/:id/answers', renderAnswers)

  .use(notFound)
  .listen(process.env.PORT, () => console.log(chalk.green(`[Server] listening on port ${process.env.PORT}...`)))

function getPollData (id) {
  return new Promise(async (resolve, reject) => {
    const result = await db.query('SELECT * FROM aPollo.polls WHERE id = ?', id)
    if (!result[0] || !result) return reject(new Error(`No poll with id ${id}`))

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

function render (req, res) {
  const url = req.url.replace('/', '')

  if (url === '' || url === 'index') return res.render('index')
  if (url === 'poll') return res.render('create')
}

async function moreOptions (req, res) {
  console.log('more options plx kthx')
}

async function createPoll (req, res) {
  const data = {
    question: req.body.question,
    option1title: req.body.option1,
    option1value: 0,
    option2title: req.body.option2,
    option2value: 0,
    option3title: req.body.option3,
    option3value: 0,
    option4title: req.body.option4,
    option4value: 0,
    option5title: req.body.option5,
    option5value: 0,
    option6title: req.body.option6,
    option6value: 0,
    option7title: req.body.option7,
    option7value: 0,
    option8title: req.body.option8,
    option8value: 0,
    option9title: req.body.option9,
    option9value: 0,
    option10title: req.body.option10,
    option10value: 0
  }

  try {
    const result = await db.query('INSERT INTO aPollo.polls SET ?', data)
    const id = result.insertId

    res.redirect(`/poll/${id}/answers`)
  } catch (err) {
    console.error(err)
  }
}

async function renderPoll (req, res) {
  const id = req.params.id

  try {
    const data = await getPollData(id)

    res.render('poll', { data: data })
  } catch (err) {
    console.error(err)
  }
}

async function submitAnswer (req, res) {
  const id = req.params.id
  const option = req.body.option

  try {
    await db.query(`UPDATE aPollo.polls set ${option} = ${option} + 1 WHERE id = ?`, id)

    res.redirect(`/poll/${id}/answers`)
  } catch (err) {
    console.error(err)
  }
}

async function renderAnswers (req, res) {
  let pollData = {
    total: 0,
    onePercent: 0
  }
  const id = req.params.id

  try {
    let data = await getPollData(id)

    data.options.forEach(option => {
      if (option.value) pollData.total += option.value
    })

    pollData.onePercent = pollData.total / 100
    // console.log(data, pollData)

    data.url = req.protocol + '://' + req.get('host') + req.originalUrl.replace('/answers', '')

    console.log(data)

    res.render('answers', { data: data })
  } catch (err) {
    console.error(err)
  }
}

function notFound (req, res) {
  res.status(404).send('Page not found')
}
