<?php

$data = json_decode(file_get_contents("php://input"), true);

$language = $data["language"];
$code = $data["code"];
$input = $data["input"];

// temp filenames
$filename = uniqid();

// --------------------
// Run Python code
// --------------------
if ($language === "python") {
    file_put_contents("$filename.py", $code);
    $output = shell_exec("python3 $filename.py << EOF
$input
EOF");
    echo trim($output);
    unlink("$filename.py");
    exit;
}

// --------------------
// Run C++ code
// --------------------
if ($language === "cpp") {
    file_put_contents("$filename.cpp", $code);
    shell_exec("g++ $filename.cpp -o $filename.out 2>&1");

    $output = shell_exec("./$filename.out << EOF
$input
EOF");

    echo trim($output);

    unlink("$filename.cpp");
    unlink("$filename.out");
    exit;
}
?>