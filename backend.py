from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route("/run", methods=["POST"])
def run_code():
    code = request.json["code"]

    with open("program.cpp", "w") as f:
        f.write(code)

    compile_proc = subprocess.run(
        ["g++", "program.cpp", "-o", "program"],
        capture_output=True,
        text=True
    )

    if compile_proc.returncode != 0:
        return jsonify({"error": compile_proc.stderr})

    run_proc = subprocess.run(
        ["./program"],
        capture_output=True,
        text=True
    )

    return jsonify({"output": run_proc.stdout})
