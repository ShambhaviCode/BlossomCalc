const test = require("node:test");
const assert = require("node:assert/strict");
const { evaluateExpression } = require("../evaluate.js");

test("applies operator precedence", () => {
    assert.equal(evaluateExpression("2+3*4"), 14);
    assert.equal(evaluateExpression("10-4/2"), 8);
    assert.equal(evaluateExpression("8/4/2"), 1);
    assert.equal(evaluateExpression("10-3-2"), 5);
});

test("respects parentheses", () => {
    assert.equal(evaluateExpression("(2+3)*4"), 20);
    assert.equal(evaluateExpression("((1+1))*(3)"), 6);
});

test("handles unary signs", () => {
    assert.equal(evaluateExpression("-5+2"), -3);
    assert.equal(evaluateExpression("3*-2"), -6);
    assert.equal(evaluateExpression("-(2+3)"), -5);
    assert.equal(evaluateExpression("--4"), 4);
});

test("handles decimals", () => {
    assert.equal(evaluateExpression(".5*4"), 2);
    assert.equal(evaluateExpression("2.5+2.5"), 5);
    assert.equal(evaluateExpression("5."), 5);
});

test("hides floating-point noise", () => {
    assert.equal(evaluateExpression("0.1+0.2"), 0.3);
    assert.equal(evaluateExpression("1.1*3"), 3.3);
});

test("reads leading zeros as decimal, not octal", () => {
    assert.equal(evaluateExpression("010+1"), 11);
});

test("rejects division by zero", () => {
    assert.throws(() => evaluateExpression("1/0"));
    assert.throws(() => evaluateExpression("5/(2-2)"));
});

test("rejects malformed expressions", () => {
    for (const bad of ["", "   ", "2+", "*2", "(1+2", "1+2)", "()", "1..2", "1.2.3", "2**3", "2(3)"]) {
        assert.throws(() => evaluateExpression(bad), undefined, bad);
    }
});

test("rejects anything that isn't arithmetic", () => {
    for (const bad of ["alert(1)", "1;2", "Math.PI", "1e3", "0x10"]) {
        assert.throws(() => evaluateExpression(bad), undefined, bad);
    }
});
