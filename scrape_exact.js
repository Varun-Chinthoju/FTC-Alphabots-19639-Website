const puppeteer = require('puppeteer');

async function scrapeSeason(url) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        const data = await page.evaluate(() => {
            const results = [];
            // Google Sites uses img tags.
            const images = Array.from(document.querySelectorAll('img')).filter(img => img.src.includes('googleusercontent'));
            
            // For each image, we find its position, and find the text element directly below it
            for (let img of images) {
                const imgRect = img.getBoundingClientRect();
                
                // Find all text elements
                const texts = Array.from(document.querySelectorAll('p, h2, h3, span, div.yaqOZd'))
                    .filter(el => {
                        const t = el.innerText.trim();
                        return t.length > 2 && t.split(' ').length <= 4 && !t.includes('http') && !t.includes('Season');
                    });
                
                // Find nearest text element below this image
                let closestText = null;
                let minDist = Infinity;
                
                for (let textEl of texts) {
                    const txtRect = textEl.getBoundingClientRect();
                    // Must be below the image (or same vertical center roughly)
                    if (txtRect.top >= imgRect.bottom - 20) {
                        // Check horizontal alignment
                        const imgCenter = imgRect.left + imgRect.width / 2;
                        const txtCenter = txtRect.left + txtRect.width / 2;
                        const dist = Math.abs(imgCenter - txtCenter) + (txtRect.top - imgRect.bottom);
                        
                        if (dist < minDist && dist < 300) { // arbitrary threshold
                            minDist = dist;
                            closestText = textEl.innerText.trim();
                        }
                    }
                }
                
                if (closestText) {
                    results.push({ name: closestText, img: img.src });
                }
            }
            return results;
        });
        
        console.log(`\nSeason: ${url}`);
        const unique = [];
        data.forEach(d => {
            if (!unique.find(u => u.name === d.name)) {
                unique.push(d);
                console.log(`"${d.name}": "${d.img}",`);
            }
        });
        
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

async function run() {
    await scrapeSeason('https://www.alphabotsrobotics.com/team/2021-2022-season');
    await scrapeSeason('https://www.alphabotsrobotics.com/team/2024-2025-season');
    await scrapeSeason('https://www.alphabotsrobotics.com/team/2023-2024-season');
    await scrapeSeason('https://www.alphabotsrobotics.com/team/2022-2023-season');
}

run();
