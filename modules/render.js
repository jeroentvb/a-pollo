const db = require('./db')

function home (req, res) {
  res.render('index')
}

function create (req, res) {
  res.render('create')
}

async function moreOptions (req, res) {
  const data = {
    question: req.body.question,
    options: [
      req.body.option1,
      req.body.option2,
      req.body.option3,
      req.body.option4,
      req.body.option5,
      req.body.option6,
      '',
      '',
      '',
      ''
    ]
  }

  res.render('create-more', { data: data })
}

async function id (req, res) {
  const id = req.params.id

  try {
    const data = await db.getPollData(id)

    res.render('poll', { data: data })
  } catch (err) {
    console.error(err)
    res.render('error', { message: err.message })
  }
}

async function answers (req, res) {
  const id = req.params.id
  const url = req.protocol + '://' + req.get('host') + req.originalUrl.replace('/answers', '')
  try {
    let data = await db.getPollData(id, url)

    res.render('answers', { data: data })
  } catch (err) {
    console.error(err)
    res.render('error', { message: err.message })
  }
}

function notFound (req, res) {
  res.status(404).send('Page not found')
}

module.exports = {
  home,
  poll: {
    create,
    moreOptions,
    id,
    answers
  },
  notFound
}
