import fs from "node:fs";
import path from 'path';

const TYPES = ["feat", "fix", "chore", "docs", "refactor", "test", "style"];
const MERGE = 'Merge';

// Read file with commit message
const commitMsgFilePath = process.argv[2];
const commitMsg = fs.readFileSync(path.resolve(commitMsgFilePath), 'utf8');

// Validate commit message
const isTypeMsgCorrect = TYPES.some((type) => commitMsg.startsWith(`${type}: `));
const isMergeMsg = commitMsg.startsWith(`${MERGE} `);

if (isTypeMsgCorrect) {
    console.log('VALID COMMIT');
    process.exit(0);
}
if (isMergeMsg) {
    console.log('VALID MERGE');
    process.exit(0);
}

process.exit(1);


