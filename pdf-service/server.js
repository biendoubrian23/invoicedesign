const express = require('express');
const cors = require('cors');
const { chromium } = require('playwright-core');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['POST', 'GET'],
}));
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'pdf-service' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Générer PDF
app.post('/api/pdf', async (req, res) => {
  let browser = null;
  
  try {
    const { html, format = 'A4' } = req.body;

    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    console.log('[PDF] Starting browser...');
    
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--single-process',
      ],
    });

    const context = await browser.newContext({
      viewport: { width: 794, height: 1123 },
    });

    const page = await context.newPage();

    console.log('[PDF] Loading HTML content...');
    await page.setContent(html, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Attendre les polices
    await page.waitForFunction(() => document.fonts.ready);
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('[PDF] Generating PDF...');
    const pdfBuffer = await page.pdf({
      format: format,
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await browser.close();
    console.log('[PDF] PDF generated successfully');

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"',
      'Content-Length': pdfBuffer.length,
    });
    res.send(pdfBuffer);

  } catch (error) {
    console.error('[PDF] Error:', error);
    
    if (browser) {
      try { await browser.close(); } catch {}
    }

    res.status(500).json({ 
      error: 'Failed to generate PDF', 
      details: error.message 
    });
  }
});

// Générer Image
app.post('/api/image', async (req, res) => {
  let browser = null;
  
  try {
    const { html, type = 'png', quality = 100 } = req.body;

    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    console.log('[Image] Starting browser...');
    
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--single-process',
      ],
    });

    const context = await browser.newContext({
      viewport: { width: 794, height: 1123 },
      deviceScaleFactor: 3,
    });

    const page = await context.newPage();

    await page.setContent(html, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    await page.waitForFunction(() => document.fonts.ready);
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('[Image] Taking screenshot...');
    const imageBuffer = await page.screenshot({
      fullPage: true,
      type: type,
      quality: type === 'jpeg' ? quality : undefined,
    });

    await browser.close();
    console.log('[Image] Screenshot generated successfully');

    const contentType = type === 'jpeg' ? 'image/jpeg' : 'image/png';
    res.set({
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="document.${type}"`,
      'Content-Length': imageBuffer.length,
    });
    res.send(imageBuffer);

  } catch (error) {
    console.error('[Image] Error:', error);
    
    if (browser) {
      try { await browser.close(); } catch {}
    }

    res.status(500).json({ 
      error: 'Failed to generate image', 
      details: error.message 
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`PDF Service running on port ${PORT}`);
});
