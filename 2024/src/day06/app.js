try {
  const source = new EventSource('/events')
  const outputEl = document.getElementById('output')
  console.log(outputEl)

  source.onmessage = (event) => {
    console.log('Received event: ', event)

    const data = JSON.parse(event.data)
    const p = document.createElement('p')
    p.textContent = `Event received: ${data.timestamp}`
    outputEl.appendChild(p)
  }

  source.onerror = err => console.error('Eventsource failed: ', err)
}
catch (err) {
  console.error('[EVENT STREAM] Error: ', err)
}
