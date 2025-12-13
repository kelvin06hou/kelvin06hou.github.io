let pyodide = null;

/* =====================
   Shared Utilities
===================== */

const tests = [
    [1, 2],
    [-5, 10],
    [100, 200],
    [-100, -200],
    [0, 0],
    [2000000000, -2000000000],
    [999999999, 1],
    [-999999999, -1],
    [123456789, 987654321],
    [-2147483648, 2147483647]
];

function showTab(id) {
    document.querySelectorAll(".tab").forEach(t => t.style.display = "none");
    document.getElementById(id).style.display = "block";
}

showTab("instruction");

/* =====================
    C++ Solution
    ===================== */    

function hasMainFunction(code) {
    return /\bint\s+main\s*\(/.test(code);
}

async function runCpp() {
    const code = document.getElementById("cppCode").value.trim();
    let output = "";

    if (!hasMainFunction(code)) {
        document.getElementById("cppResult").innerText =
            "Case 0: X\nMissing main() function";
        return;
    }

    let compiled;

    /* ---- Case 0: compilation ---- */
    try {
        compiled = await Clang.compile(code);
        output += "Case 0: V\n";
    } catch (e) {
        document.getElementById("cppResult").innerText = "Case 0: X";
        return;
    }

    /* ---- Cases 1–10 ---- */
    for (let i = 0; i < tests.length; i++) {
        const [a, b] = tests[i];
        const expected = (BigInt(a) + BigInt(b)).toString();

        try {
            const raw = await compiled.run(`${a} ${b}`);
            const result = raw.trim().match(/-?\d+/)?.[0] ?? "";

            output += `Case ${i + 1}: ${result === expected ? "V" : "X"}\n`;
        } catch {
            output += `Case ${i + 1}: X\n`;
        }
    }

    document.getElementById("cppResult").innerText = output;
}

/* =====================
    Python Solution
===================== */

async function runPython() {
    if (!pyodide) {
        pyodide = await loadPyodide();
    }

    const code = document.getElementById("pyCode").value;
    let output = "";

    /* ---- Case 0: syntax only ---- */
    try {
        pyodide.runPython(`compile(${JSON.stringify(code)}, "<user>", "exec")`);
        output += "Case 0: V\n";
    } catch {
        document.getElementById("pyResult").innerText = "Case 0: X";
        return;
    }

    /* ---- Cases 1–10 ---- */
    for (let i = 0; i < tests.length; i++) {
        const [a, b] = tests[i];
        const expected = (BigInt(a) + BigInt(b)).toString();

        try {
            const result = pyodide.runPython(`
import sys
from io import StringIO

_backup_stdin = sys.stdin
_backup_stdout = sys.stdout

sys.stdin = StringIO("${a} ${b}")
sys.stdout = StringIO()

${code}

_out = sys.stdout.getvalue().strip()

sys.stdin = _backup_stdin
sys.stdout = _backup_stdout

_out
`).toString().trim();

            output += `Case ${i + 1}: ${result === expected ? "V" : "X"}\n`;
        } catch {
            output += `Case ${i + 1}: X\n`;
        }
    }

    document.getElementById("pyResult").innerText = output;
}
