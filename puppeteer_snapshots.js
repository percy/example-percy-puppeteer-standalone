// A script to navigate our app using Puppeteer and take snapshots with Percy.

(async () => {
  const puppeteer = require('puppeteer')
  const httpServer = require('http-server')
  const { percySnapshot } = require('@percy/puppeteer')

  // Start a local HTTP Server to host our TodoMVC app.
  const server = httpServer.createServer()
  const PORT = 8000
  server.listen(PORT)
  const URL = `http://localhost:${PORT}`

  // Start a Puppeteer instance.
  const browser = await puppeteer.launch({
     headless: true,
     args: [ '--single-process' ]
  })
  const page = await browser.newPage()

  // Load app.
  await page.goto(URL)
  await percySnapshot(page, 'TodoMVC home page')

  // Enter a new to-do.
  await page.type('.new-todo', 'Fancy todo from Puppeteer')
  await page.keyboard.press('Enter')
  await percySnapshot(page, 'TodoMVC with a new todo', { widths: [768, 992, 1200] })

  // Close up our Puppeteer browser.
  browser.close()

  // Shut down our HTTP server.
  server.close()
})()
