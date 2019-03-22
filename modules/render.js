const db = require('./db')

function getPollData (id) {
  return new Promise(async (resolve, reject) => {
    const result = await db.query('SELECT * FROM aPollo.polls WHERE id = ?', id)
    if (!result[0] || !result) return reject(new Error(`Er is geen poll met het id ${id}`))

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
    const data = await getPollData(id)

    res.render('poll', { data: data })
  } catch (err) {
    console.error(err)
    res.render('error', { message: err.message })
  }
}

async function answers (req, res) {
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

    data.url = req.protocol + '://' + req.get('host') + req.originalUrl.replace('/answers', '')

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
