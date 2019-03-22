(() => {
  const options = document.getElementById('options')
  const button = document.getElementById('more-options')
  let currentNewOption = 3

  button.value = 'Add option'

  for (let i = 3; i < 6; i++) {
    document.getElementById(`option-${i}-label`).remove()
    document.getElementById(`option-${i}`).remove()
  }

  button.addEventListener('click', e => {
    e.preventDefault()

    const label = document.createElement('label')
    label.id = `option-${currentNewOption}-label`
    label.setAttribute('for', `option-${currentNewOption}`)
    const labelText = document.createTextNode(`Option ${currentNewOption}`)
    label.appendChild(labelText)

    const option = document.createElement('input')
    option.setAttribute('type', 'text')
    option.id = `option-${currentNewOption}`
    option.setAttribute('name', `option${currentNewOption}`)

    options.appendChild(label)
    options.appendChild(option)

    currentNewOption++

    if (currentNewOption === 11) document.getElementById('more-options').remove()
  })
})()
