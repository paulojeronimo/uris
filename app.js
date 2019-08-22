'use strict'

const checkResponse = response => {
  if (!response.ok)
    throw Error(`${response.statusText} - ${response.url}`)
  return response
}

const handleJson = json => {
  const ol = document.querySelector('ol')
  let li, a, text
  for (let item in json) {
    li = document.createElement('li')
    a = document.createElement('a')
    a.setAttribute('href', json[item].uri)
    a.setAttribute('target', '_blank')
    a.textContent = item
    text = document.createTextNode(` - ${json[item].description}`)
    li.appendChild(a)
    li.appendChild(text)
    ol.appendChild(li)
  }
}

fetch('./uris.json')
  .then(checkResponse)
  .then(resp => resp.json())
  .then(handleJson)
  .catch(error => document.querySelector('h2').textContent = error)
