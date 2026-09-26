// Safe arithmetic evaluator for BlossomCalc.
// Supports + - * / parentheses, decimals and unary +/-.
// Replaces eval(), which ran arbitrary JavaScript, read "010" as octal 8
// and returned undefined for an empty expression.

function evaluateExpression(input) {

    const tokens = tokenize(input);
    let pos = 0;

    function peek() {
        return tokens[pos];
    }

    function next() {
        return tokens[pos++];
    }

    // expression := term (("+" | "-") term)*
    function parseExpression() {
        let value = parseTerm();

        while (peek() === "+" || peek() === "-") {
            const op = next();
            const right = parseTerm();
            value = op === "+" ? value + right : value - right;
        }

        return value;
    }

    // term := factor (("*" | "/") factor)*
    function parseTerm() {
        let value = parseFactor();

        while (peek() === "*" || peek() === "/") {
            const op = next();
            const right = parseFactor();

            if (op === "/" && right === 0) {
                throw new Error("Division by zero");
            }

            value = op === "*" ? value * right : value / right;
        }

        return value;
    }

    // factor := ("+" | "-") factor | number | "(" expression ")"
    function parseFactor() {
        const token = next();

        if (token === "+") return parseFactor();
        if (token === "-") return -parseFactor();

        if (token === "(") {
            const value = parseExpression();

            if (next() !== ")") {
                throw new Error("Missing closing parenthesis");
            }

            return value;
        }

        if (typeof token === "number") return token;

        throw new Error("Unexpected input");
    }

    if (tokens.length === 0) {
        throw new Error("Empty expression");
    }

    const result = parseExpression();

    if (pos !== tokens.length) {
        throw new Error("Unexpected input");
    }

    // Trim binary floating-point noise: 0.1 + 0.2 -> 0.3
    return Number(result.toPrecision(12));
}

function tokenize(input) {

    const tokens = [];
    let i = 0;

    while (i < input.length) {
        const ch = input[i];

        if (ch === " ") {
            i++;
            continue;
        }

        if ("+-*/()".includes(ch)) {
            tokens.push(ch);
            i++;
            continue;
        }

        const match = /^(\d+\.?\d*|\.\d+)/.exec(input.slice(i));

        if (!match) {
            throw new Error("Unexpected input");
        }

        tokens.push(parseFloat(match[0]));
        i += match[0].length;
    }

    return tokens;
}

if (typeof module !== "undefined") {
    module.exports = { evaluateExpression };
}
