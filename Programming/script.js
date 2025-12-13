let pyodideReady = false;
let pyodide;

async function loadPyodideOnce() {
    if (!pyodideReady) {
        pyodide = await loadPyodide();
        pyodideReady = true;
    }
}

const tests = [
    null, // Case 0 (execution check)
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
    document.querySelectorAll('.tab').forEach(t => t.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

showTab('instruction');

/* ===================== Python ===================== */

async function runPython() {
    await loadPyodideOnce();
    const code = document.getElementById("pyCode").value;
    let result = "";

    // Case 0
    try {
        compile.run("0 0");
        result += "Case 0: V\n";
    } catch {
        document.getElementById("cppResult").innerText = "Case 0: X";
        return;
    }
    
    for (let i = 1; i <= 10; i++) {
        const [a, b] = tests[i];
        try {
            pyodide.globals.set("input_data", `${a} ${b}`);
            const wrapped = `
input = lambda: input_data
${code}
`;
            const output = pyodide.runPython(wrapped).toString().trim();
            const expected = (BigInt(a) + BigInt(b)).toString();

            result += `Case ${i}: ${output === expected ? "V" : "X"}\n`;
        } catch {
            result += `Case ${i}: X\n`;
        }
    }

    document.getElementById("pyResult").innerText = result;
}

/* ===================== C++ ===================== */

function runCpp() {
    const code = document.getElementById("cppCode").value;
    let result = "";

    try {
        const compile = Clang.compile(code);
        if (!compile.success) throw "compile error";
        result += "Case 0: V\n";

        for (let i = 1; i <= 10; i++) {
            const [a, b] = tests[i];
            const output = compile.run(`${a} ${b}`).trim();
            const expected = (BigInt(a) + BigInt(b)).toString();
            result += `Case ${i}: ${output === expected ? "V" : "X"}\n`;
        }
    } catch {
        result = "Case 0: X";
    }

    document.getElementById("cppResult").innerText = result;
}

