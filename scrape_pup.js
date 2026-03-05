const puppeteer = require('puppeteer');

async function scrapeSeason(url) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        // Google Sites usually puts images and text in distinct blocks.
        // We can just grab all images and all text blocks, or look for standard Google Sites image structures.
        const data = await page.evaluate(() => {
            const results = [];
            // This is a naive heuristic: find image, find nearest text below it
            const images = Array.from(document.querySelectorAll('img')).filter(img => img.src.includes('googleusercontent') || img.src.includes('drive.google.com'));
            
            for (let img of images) {
                // Find parent container
                let container = img.closest('section') || img.parentElement.parentElement.parentElement;
                let textElements = container ? Array.from(container.querySelectorAll('p, h2, h3, span')) : [];
                
                let textContent = textElements.map(e => e.innerText.trim()).filter(t => t.length > 2 && !t.includes('http'));
                results.push({
                    img: img.src,
                    text: [...new Set(textContent)]
                });
            }
            return results;
        });
        
        console.log(`--- Data for ${url} ---`);
        data.forEach(d => {
            if (d.text.length > 0) {
                console.log("IMG:", d.img.substring(0, 50) + "...");
                console.log("TEXT:", d.text.join(' | '));
            }
        });
        
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

async function run() {
    await scrapeSeason('https://www.alphabotsrobotics.com/team/2025-2026-season');
    await scrapeSeason('https://www.alphabotsrobotics.com/team/2024-2025-season');
}

run();
