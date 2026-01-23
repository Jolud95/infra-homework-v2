import assert from "node:assert";

const res = await fetch('http://localhost:4000');
const result = await res.json();

assert.equal(res.status, 200);
assert.equal(result.id, 79);
