// A script to navigate our TodoMVC app using Puppeteer.

(async () => {
  const puppeteer = require('puppeteer')
  const httpServer = require('http-server')

  // Start a local HTTP Server to host our TodoMVC app.
  const server = httpServer.createServer()
  const PORT = 8000
  server.listen(PORT)
  const URL = `http://localhost:${PORT}`

  // Start a Puppeteer instance.
  const browser = await puppeteer.launch({ headless: true})
  const page = await browser.newPage();

  // Load app.
  await page.goto(URL);

  // Enter a new to-do.
  await page.type('.new-todo', 'Fancy todo from Puppeteer')
  await page.keyboard.press('Enter')

  // Close up our Puppeteer browser.
  browser.close()

  // Shut down our HTTP server.
  server.close()
})()
