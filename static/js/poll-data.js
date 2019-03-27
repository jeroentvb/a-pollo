/* global WebSocket */

(() => {
  if ('WebSocket' in window) {
    var wsUrl = `ws://${window.location.href.split('/')[2].split(':')[0]}:40510`

    // Create WebSocket connection.
    var socket = new WebSocket(wsUrl)

    // Connection opened
    // socket.addEventListener('open', function (event) {
    //   socket.send('Hello Server!')
    // })

    // Listen for messages
    socket.addEventListener('message', function (event) {
      var id = window.location.pathname.split('/')[2]
      var data = JSON.parse(event.data)
      console.log(data)

      if (data.id === id) {
        // update all statistics
        // for (var i = 0; i < data.options.length; i++) {
        //   if (data.options[i].value) {
        //     var amount = document.getElementsByClassName('amount--' + i)[0]
        //     amount.style.width = data.options[i].percentage + '%'
        //   }
        // }

        data.options.forEach((option, i) => {
          if (option.value) {
            var amount = document.getElementsByClassName(`amount--${i + 1}`)[0]
            amount.style.width = `${option.percentage}%`

            var text = document.getElementsByClassName(`option${i + 1}value`)[0]
            text.textContent = `${option.percentage}% (${option.value} ${option.value === 1 ? 'vote' : 'votes'})`
          }
        })
      }
    })
  }

  var shareSection = document.getElementById('share')
  var shareLink = document.getElementById('share-link')
  var url = shareLink.getAttribute('href')

  shareLink.remove()

  var input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.classList.add('option')
  input.value = url

  var button = document.createElement('button')
  button.classList.add('button')
  button.dataset.url = url
  var text = document.createTextNode('Copy url')
  button.appendChild(text)

  shareSection.appendChild(input)
  shareSection.appendChild(button)

  button.addEventListener('click', function () {
    input.select()
    document.execCommand('copy')
    button.textContent = 'Copied!'
  })
})()
