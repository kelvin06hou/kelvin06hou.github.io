let pyodide = null;

/* =====================
   Shared Utilities
===================== */

const tests = [
    [0, 0],
    [1, 2],
    [-5, 10],
    [100, 200],
    [-100, -200],
    [2000000000, -2000000000],
    [999999999, 1],
    [-999999999, -1],
    [123456789, 987654321],
    [-2147483648, 2147483647]
];

function showTab(id) {
    document.querySelectorAll('.tab').forEach(t => t.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

showTab('instruction');

/* =====================
   Python Judge
===================== */

async function runPython() {
    if (!pyodide) {
        pyodide = await loadPyodide();
    }

    const code = document.getElementById("pyCode").value;
    let output = "";

    /* ---- Case 0: syntax check ONLY ---- */
    try {
        pyodide.runPython(`compile(${JSON.stringify(code)}, "<user>", "exec")`);
        output += "Case 0: V\n";
    } catch {
        document.getElementById("pyResult").innerText = "Case 0: X";
        return;
    }

    /* ---- Cases 1–10 ---- */
    for (let i = 0; i < 10; i++) {
        const [a, b] = tests[i];
        const expected = (BigInt(a) + BigInt(b)).toString();

        try {
            pyodide.globals.set("input_data", `${a} ${b}`);
            const wrapped = `
input = lambda: input_data
${code}
`;
            const result = pyodide.runPython(wrapped).toString().trim();
            output += `Case ${i + 1}: ${result === expected ? "V" : "X"}\n`;
        } catch {
            output += `Case ${i + 1}: X\n`;
        }
    }

    document.getElementById("pyResult").innerText = output;
}

/* =====================
   C++ Judge
===================== */

function runCpp() {
    const code = document.getElementById("cppCode").value;
    let output = "";

    let compiled;

    /* ---- Case 0: compilation ONLY ---- */
    try {
        compiled = Clang.compile(code);
        if (!compiled.success) throw "compile error";
        output += "Case 0: V\n";
    } catch {
        document.getElementById("cppResult").innerText = "Case 0: X";
        return;
    }

    /* ---- Cases 1–10 ---- */
    for (let i = 0; i < 10; i++) {
        const [a, b] = tests[i];
        const expected = (BigInt(a) + BigInt(b)).toString();

        try {
            const result = compiled.run(`${a} ${b}\n`).trim();
            output += `Case ${i + 1}: ${result === expected ? "V" : "X"}\n`;
        } catch {
            output += `Case ${i + 1}: X\n`;
        }
    }

    document.getElementById("cppResult").innerText = output;
}
