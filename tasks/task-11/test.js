import assert from "node:assert";

const res = await fetch('http://localhost:3000');
const text = await res.text();

assert.equal(res.status, 200);
assert.equal(text, "hello world");
