<?php
include 's4w_testconnection.php';
$conn = OpenCon();

$i = 1;
while ($i <= 100) {
    $uniqid = uniqid();
    $key = hash('sha256', uniqid());
    echo $key . "<br>";
    $sql = "INSERT INTO keysTable (token) VALUES ('". $key. "');";
    if ($conn->query($sql) === TRUE) {
        echo "🙌🏻";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    echo $i++;
}

CloseCon($conn);
?>