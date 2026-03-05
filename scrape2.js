const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function run() {
    console.log("Fetching 2025-2026...");
    const html = await fetchUrl('https://www.alphabotsrobotics.com/team/2025-2026-season');
    
    // Split into chunks roughly around text content to see if image is nearby
    const parts = html.split('meet the team');
    if (parts.length > 1) {
        fs.writeFileSync('/tmp/team2025.html', parts[1]);
        console.log("Saved to /tmp/team2025.html");
    }
}
run();
