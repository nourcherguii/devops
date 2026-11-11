const fs = require('fs');
const path = require('path');
const studentsDir = path.join(__dirname, 'students');
const files = fs.readdirSync(studentsDir).filter(f => f.endsWith('.json') && f !== 'list.json' && f !== 'template.json');
console.log(` Validating ${files.length} student files...`);
files.forEach(file => {
    const content = fs.readFileSync(path.join(studentsDir, file), 'utf8');
    let data;
    try { data = JSON.parse(content); }
    catch (e) { console.error(`INVALID JSON FORMAT in: ${file}`); process.exit(1); }
    if (!data.name || !Array.isArray(data.links)) {
        console.error(`MISSING REQUIRED FIELDS (name, links) in: ${file}`);
        process.exit(1);
    }
});
fs.writeFileSync(path.join(studentsDir,'list.json'), JSON.stringify(files));
console.log(' Validation successful! list.json updated.');
