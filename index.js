const app = require('express')
const bodyParser = require('body-parser')
const chalk = require('chalk')

const db = require('./modules/db')
const render = require('./modules/render')

const webSocket = require('./modules/websocket')

require('dotenv').config()

db.init()

app()
  .set('view engine', 'ejs')
  .set('views', 'templates')
  .use(app.static('static'))
  .use(bodyParser.urlencoded({ extended: true }))

  .get('/', render.home)
  .get('/poll', render.poll.create)
  .post('/more-options', render.poll.moreOptions)
  .post('/create-poll', createPoll)

  .get('/poll/:id', render.poll.id)
  .post('/submit-answer/:id', submitAnswer)
  .get('/poll/:id/answers', render.poll.answers)

  .use(render.notFound)
  .listen(process.env.PORT, () => console.log(chalk.green(`[Server] listening on port ${process.env.PORT}...`)))

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

async function submitAnswer (req, res) {
  const id = req.params.id
  const option = req.body.option
  const data = {
    id: id,
    option: option
  }

  try {
    await db.query(`UPDATE aPollo.polls set ${option} = ${option} + 1 WHERE id = ?`, id)

    webSocket.broadcast(JSON.stringify(data))

    res.redirect(`/poll/${id}/answers`)
  } catch (err) {
    console.error(err)
  }
}
