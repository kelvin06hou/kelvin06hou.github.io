#!/usr/bin/env bash
set -euo pipefail

# Local helper to regenerate test_notebook.html from test.ipynb
if [ -x .venv/bin/python ]; then
  PY=.venv/bin/python
else
  PY=python
fi

echo "Using Python: $(command -v "$PY")"
"$PY" -m pip install --upgrade pip
"$PY" -m pip install nbconvert ipykernel nbformat pandas matplotlib biopython
"$PY" -m nbconvert --to html --execute test.ipynb --output test_notebook.html --ExecutePreprocessor.timeout=300
echo "Generated test_notebook.html"
