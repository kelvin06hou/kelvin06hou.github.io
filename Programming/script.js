// script.js

// Test cases: 11 cases total
// Case 0: Execution test (checks if program runs without crashing, output not strictly checked)
// Cases 1-10: Input-output tests (exact output match required)
const testCases = [
    { input: "1 2", expected: "3", isExecution: true }, // Case 0: Execution test
    { input: "1 2", expected: "3" }, // Case 1
    { input: "-1 -2", expected: "-3" }, // Case 2
    { input: "0 0", expected: "0" }, // Case 3
    { input: "1000000000 1000000000", expected: "2000000000" }, // Case 4
    { input: "-1000000000 -1000000000", expected: "-2000000000" }, // Case 5
    { input: "2000000000 0", expected: "2000000000" }, // Case 6
    { input: "-2000000000 0", expected: "-2000000000" }, // Case 7
    { input: "1 -1", expected: "0" }, // Case 8
    { input: "123456789 987654321", expected: "1111111110" }, // Case 9
    { input: "-123456789 987654321", expected: "864197532" } // Case 10
];

// Tab switching function
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';
}

// Initialize to show instruction tab
document.addEventListener('DOMContentLoaded', () => {
    showTab('instruction');
});

// Run Python tests using Pyodide
async function runPython() {
    const code = document.getElementById('pyCode').value;
    const resultDiv = document.getElementById('pyResult');
    resultDiv.innerHTML = 'Running Python tests...';

    // Load Pyodide if not already loaded
    if (!window.pyodide) {
        window.pyodide = await loadPyodide();
    }

    let results = [];
    for (let i = 0; i < testCases.length; i++) {
        const test = testCases[i];
        try {
            // Redirect stdin and stdout
            pyodide.runPython(`
import sys
from io import StringIO
sys.stdin = StringIO('${test.input}')
old_stdout = sys.stdout
sys.stdout = captured_output = StringIO()
`);
            // Run the user's code
            await pyodide.runPythonAsync(code);
            // Get captured output
            const output = pyodide.runPython('captured_output.getvalue()');
            pyodide.runPython('sys.stdout = old_stdout');
            const trimmedOutput = output.trim();
            if (test.isExecution) {
                results.push(`Case ${i}: Executed successfully (output: ${trimmedOutput})`);
            } else {
                const passed = trimmedOutput === test.expected;
                results.push(`Case ${i}: ${passed ? 'PASS' : 'FAIL'} (expected: ${test.expected}, got: ${trimmedOutput})`);
            }
        } catch (e) {
            results.push(`Case ${i}: ERROR - ${e.message}`);
        }
    }
    resultDiv.innerHTML = results.join('<br>');
}

// Run C++ tests using wasm-clang
async function runCpp() {
    const code = document.getElementById('cppCode').value;
    const resultDiv = document.getElementById('cppResult');
    resultDiv.innerHTML = 'Running C++ tests...';

    // Ensure Clang is loaded
    if (!window.Clang) {
        resultDiv.innerHTML = 'Error: Clang not loaded.';
        return;
    }

    let results = [];
    for (let i = 0; i < testCases.length; i++) {
        const test = testCases[i];
        try {
            // Compile and run C++ code with input simulation
            // Note: wasm-clang allows compiling to WASM and running with stdin/stdout redirection
            const result = await Clang.run(code, { stdin: test.input });
            const trimmedOutput = result.stdout.trim();
            if (test.isExecution) {
                results.push(`Case ${i}: Executed successfully (output: ${trimmedOutput})`);
            } else {
                const passed = trimmedOutput === test.expected;
                results.push(`Case ${i}: ${passed ? 'PASS' : 'FAIL'} (expected: ${test.expected}, got: ${trimmedOutput})`);
            }
        } catch (e) {
            results.push(`Case ${i}: ERROR - ${e.message}`);
        }
    }
    resultDiv.innerHTML = results.join('<br>');
}
