const fs = require('fs');
const https = require('https');
const path = require('path');

const scriptPath = path.resolve(__dirname, 'script.js');
const imgDir = path.resolve(__dirname, 'images', 'team');

if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        if (!url || !url.startsWith('http')) return resolve(false);
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve(true);
                });
            } else {
                file.close();
                fs.unlink(dest, () => resolve(false));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => resolve(false));
        });
    });
}

async function run() {
    let content = fs.readFileSync(scriptPath, 'utf8');
    
    // Extract the teamData object string
    const match = content.match(/const teamData = (\{[\s\S]*?\});\s*\n\s*function getInitials/);
    if (!match) {
        console.error("Could not find teamData in script.js");
        return;
    }
    
    let teamDataStr = match[1];
    let teamDataObj;
    try {
        teamDataObj = eval("(" + teamDataStr + ")");
    } catch (e) {
        console.error("Eval failed on teamData:", e);
        return;
    }
    
    let downloadCount = 0;
    
    // Iterate over all seasons
    for (const season in teamDataObj) {
        for (let i = 0; i < teamDataObj[season].length; i++) {
            const member = teamDataObj[season][i];
            if (member.img && member.img.startsWith('http')) {
                // Generate a safe filename
                const safeName = member.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
                const safeSeason = season.replace(/-/g, '_');
                const filename = `${safeSeason}_${safeName}.jpg`;
                const destPath = path.join(imgDir, filename);
                
                console.log(`Downloading ${member.name} for ${season}...`);
                const success = await downloadImage(member.img, destPath);
                
                if (success) {
                    teamDataObj[season][i].img = `images/team/${filename}`;
                    downloadCount++;
                } else {
                    console.log(`Failed to download ${member.name}`);
                    teamDataObj[season][i].img = ``;
                }
            }
        }
    }
    
    console.log(`Downloaded ${downloadCount} images.`);
    
    // Convert back to JS string formatting
    let newTeamDataStr = JSON.stringify(teamDataObj, null, 4);
    
    // Replace in file
    content = content.replace(match[1], newTeamDataStr);
    
    fs.writeFileSync(scriptPath, content, 'utf8');
    console.log("Updated script.js with local image paths.");
}

run();
