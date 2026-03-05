const fs = require('fs');
const html = fs.readFileSync('/tmp/team2025.html', 'utf8');

// A very basic HTML tokenizer
const tokens = [];
let cursor = 0;
while (cursor < html.length) {
    const nextTag = html.indexOf('<', cursor);
    if (nextTag === -1) {
        tokens.push({ type: 'text', val: html.substring(cursor).trim() });
        break;
    }
    // Add text before tag
    if (nextTag > cursor) {
        const t = html.substring(cursor, nextTag).trim();
        if (t && !t.startsWith('&')) tokens.push({ type: 'text', val: t });
    }
    const endTag = html.indexOf('>', nextTag);
    if (endTag === -1) break;
    const tag = html.substring(nextTag, endTag + 1);
    
    if (tag.toLowerCase().startsWith('<img')) {
        const match = /src="([^"]+)"/.exec(tag);
        if (match && match[1].includes('googleusercontent')) {
            tokens.push({ type: 'img', val: match[1] });
        }
    }
    cursor = endTag + 1;
}

// Now look for sequences: img -> text (name) -> text (role)
const members = [];
for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === 'img') {
        // find next two text tokens
        let name = null;
        let role = null;
        for (let j = i + 1; j < tokens.length && j < i + 15; j++) {
            if (tokens[j].type === 'text') {
                if (!name) name = tokens[j].val;
                else if (!role) role = tokens[j].val;
                if (name && role) break;
            }
        }
        if (name) {
            members.push({ img: tokens[i].val, name, role });
        }
    }
}

console.log(JSON.stringify(members, null, 2));
