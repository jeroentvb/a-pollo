(() => {
  var options = document.getElementById('options')
  var button = document.getElementById('more-options')
  var currentNewOption = 3

  button.value = 'Add option'

  for (var i = 3; i < 6; i++) {
    document.getElementById('option-' + i + '-label').remove()
    document.getElementById('option-' + i).remove()
  }

  button.addEventListener('click', function (e) {
    e.preventDefault()

    var label = document.createElement('label')
    label.id = 'option-' + currentNewOption + '-label'
    label.setAttribute('for', 'option-' + currentNewOption)
    var labelText = document.createTextNode('Option' + currentNewOption)
    label.appendChild(labelText)

    var option = document.createElement('input')
    option.setAttribute('type', 'text')
    option.id = 'option-' + currentNewOption
    option.setAttribute('name', 'option' + currentNewOption)

    options.appendChild(label)
    options.appendChild(option)

    currentNewOption++

    if (currentNewOption === 11) {
      document.getElementById('more-options').remove()
    }
  })
})()
