/* global WebSocket */

(() => {
  if (WebSocket) {
    var wsUrl = `ws://${window.location.href.split('/')[2].split(':')[0]}:40510`

    // Create WebSocket connection.
    var socket = new WebSocket(wsUrl)

    // Connection opened
    socket.addEventListener('open', function (event) {
      socket.send('Hello Server!')
    })

    // Listen for messages
    socket.addEventListener('message', function (event) {
      var id = window.location.pathname.split('/')[2]
      var data = JSON.parse(event.data)

      if (data.id === id) {
        var option = document.getElementsByClassName(data.option)[0]
        option.textContent = parseInt(option.textContent) + 1
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
