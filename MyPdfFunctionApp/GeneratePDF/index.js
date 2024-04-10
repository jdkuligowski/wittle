const puppeteer = require('puppeteer-core')
const chromium = require('chrome-aws-lambda')

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.')

  let browser = null
    
  try {
    // Launch the browser using Puppeteer
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    })

    // Create a new page
    const page = await browser.newPage()

    // Set the content of the page to the HTML provided in the request
    await page.setContent(req.body.htmlContent, { waitUntil: 'networkidle0' })

    // Generate PDF and get it as a buffer
    const pdfBuffer = await page.pdf()

    // Respond with the PDF buffer
    context.res = {
      body: pdfBuffer,
      headers: {
        'Content-Type': 'application/pdf',
      },
    }

  } catch (error) {
    context.res = {
      status: 500,
      body: 'Error generating PDF: ' + error.toString(),
    }
  } finally {
    if (browser !== null) {
      await browser.close()
    }
  }
}