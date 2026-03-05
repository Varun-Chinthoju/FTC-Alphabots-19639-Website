const fs = require('fs');

const scrapedRaw = fs.readFileSync('/tmp/scraped_data.txt', 'utf8');

const imageMap = {};
// "Suhas Bathini": "https://..."
const lines = scrapedRaw.split('\n');
for (const line of lines) {
    if (line.includes('": "https://lh3.')) {
        const parts = line.split('": "');
        const name = parts[0].replace('"', '').trim();
        let url = parts[1].replace('",', '').replace('"', '').trim();
        // The original background command output had some truncation but wait, 
        // the `node scrape_exact.js > /tmp/scraped_data.txt` wrote the full lines.
        imageMap[name] = url;
        // fallback matching for missing last names or variations
        const first = name.split(' ')[0];
        if (!imageMap[first]) imageMap[first] = url;
    }
}

// Full current data
const oldTeamData = {
        '2025-2026': [
            { name: 'Suhas Bathini', role: 'Team Captain' },
            { name: 'Akshay Shoroff', role: 'Team Captain' },
            { name: 'Saket Sandru', role: 'Hardware Captain' },
            { name: 'Srithan Deverashetty', role: 'Hardware Member' },
            { name: 'Shiv Gurjar', role: 'Hardware Member' },
            { name: 'Varun Chinthoju', role: 'Software Member' },
            { name: 'Rushil Shah', role: 'Outreach Captain' },
            { name: 'Aadit Verma', role: 'Outreach Captain' },
            { name: 'Renu Mandala', role: 'Outreach Member' },
            { name: 'Aashi', role: 'Outreach Member' },
            { name: 'Vihaan Sanghvi', role: 'Outreach Member' }
        ],
        '2024-2025': [
            { name: 'Suhas Bathini', role: 'Team Captain' },
            { name: 'Akshay Shoroff', role: 'Team Captain' },
            { name: 'Rushil Shah', role: 'Outreach Captain' },
            { name: 'Shiv Gurjar', role: 'Hardware Captain' },
            { name: 'Aadit Verma', role: 'Hardware Member' },
            { name: 'Trisha Bhuwania', role: 'Software Member' },
            { name: 'Ronit Parikh', role: 'Software Member' },
            { name: 'Rishaan Jain', role: 'Software Member' },
            { name: 'Saket Sandru', role: 'Hardware Member' },
            { name: 'Vihaan Sanghvi', role: 'Outreach Member' },
            { name: 'Simran Chhabria', role: 'Hardware Member' },
            { name: 'Saanvi Shah', role: 'Outreach Member' }
        ],
        '2023-2024': [
            { name: 'Maanav Shah', role: 'Team Captain' },
            { name: 'Parsh Gandhi', role: 'Team Captain' },
            { name: 'Gabriel Hwang', role: 'Hardware Captain' },
            { name: 'Suhas Bathini', role: 'Software Captain' },
            { name: 'Anand Raghunath', role: 'Outreach Captain' },
            { name: 'Shiv Gurjar', role: 'Hardware Member' },
            { name: 'Saket Sandru', role: 'Hardware Member' },
            { name: 'Simran Chhabria', role: 'Hardware Member' },
            { name: 'Rishaan Jain', role: 'Software Member' },
            { name: 'Trisha Bhuwania', role: 'Software Member' },
            { name: 'Rushil Shah', role: 'Outreach Member' },
            { name: 'Saanvi Shah', role: 'Outreach Member' },
            { name: 'Shakil Musthafa', role: 'Hardware Member' }
        ],
        '2022-2023': [
            { name: 'Parsh Gandhi', role: 'Team Captain' },
            { name: 'Tarun Iyer', role: 'Team Captain' },
            { name: 'Suhas Bathini', role: 'Software Captain' },
            { name: 'Maanav Shah', role: 'Hardware Captain' },
            { name: 'Amogh Khandkar', role: 'Hardware Member' },
            { name: 'Pranav Kunisetty', role: 'Hardware Member' },
            { name: 'Anand Raghunath', role: 'Hardware Member' },
            { name: 'Gabriel Hwang', role: 'Hardware Member' },
            { name: 'Shiv Gurjar', role: 'Hardware Member' },
            { name: 'Rushil Shah', role: 'Hardware Member' },
            { name: 'Shakil Musthafa', role: 'Hardware Member' }
        ],
        '2021-2022': [
            { name: 'Tarun Iyer', role: 'Team Captain' },
            { name: 'Parsh Gandhi', role: 'Captain' },
            { name: 'Maanav Shah', role: 'Hardware Captain' },
            { name: 'Anand Raghunath', role: 'Outreach Captain' },
            { name: 'Gabriel Hwang', role: 'Hardware Member' },
            { name: 'Suhas Bathini', role: 'Software Member' },
            { name: 'Amogh Khandkar', role: 'Hardware Member' },
            { name: 'Pranav Kunisetty', role: 'Hardware Member' },
            { name: 'Rushil Shah', role: 'Member' }
        ]
};

// Function to sort a team array according to:
// Captains -> Software Captain -> Software Members -> Hardware Captain -> Hardware Members -> Outreach Cap -> Outreach Members -> Members
function getRoleWeight(role) {
    let r = role.toLowerCase();
    if (r === 'team captain' || r === 'captain' || r.includes(' co-captain') || r.includes(' president')) return 10;
    if (r === 'lead programmer' || r === 'software captain') return 20;
    if (r === 'lead driver' || r === 'software member' || r.includes('software')) return 30;
    if (r === 'lead builder' || r === 'hardware captain') return 40;
    if (r.includes('hardware builder') || r === 'hardware member' || r.includes('hardware')) return 50;
    if (r === 'outreach captain' || r === 'lead outreach') return 60;
    if (r === 'outreach member' || r.includes('outreach')) return 70;
    return 100; // General Members
}

let newTeamDataStr = "    const teamData = {\n";

for (const season in oldTeamData) {
    let team = oldTeamData[season];
    // inject img
    team.forEach(m => {
        let n = m.name;
        // hardcode known missing or different names
        if (n === 'Varun Chinthoju') n = 'Aadit Verma'; // wait no
        const pic = imageMap[m.name] || imageMap[m.name.split(' ')[0]] || '';
        m.img = pic;
    });

    // sort
    team.sort((a, b) => {
        let wa = getRoleWeight(a.role);
        let wb = getRoleWeight(b.role);
        if (wa !== wb) return wa - wb;
        return a.name.localeCompare(b.name);
    });

    newTeamDataStr += `        '${season}': [\n`;
    const membersList = team.map(m => `            { name: '${m.name}', role: '${m.role}', img: '${m.img}' }`).join(',\n');
    newTeamDataStr += membersList + `\n        ],\n`;
}
newTeamDataStr += "    };";

fs.writeFileSync('/tmp/new_team_data.js', newTeamDataStr);
console.log("Done");
