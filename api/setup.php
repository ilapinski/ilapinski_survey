<?php
include 's4w_testconnection.php';
$conn = OpenCon();

$json = file_get_contents('php://input');
$data = json_decode($json, true);

session_start();


//if no token in session
if (!isset($_SESSION['token'])) {
    $sql = "SELECT * FROM keysTable WHERE reserved = 0 ORDER BY RAND() LIMIT 1;";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            $userToken = $row["token"];
            $_SESSION['token'] = $userToken;

            //reserve token
            $sql = "UPDATE keysTable SET reserved='1' WHERE token = '".$userToken."'";
            if ($conn->query($sql) === TRUE) {
                echo('{"setup": "'.$_SESSION["token"].'", "return": false}');
            } else {
                die('{"error": "T_RES"');
            }
    
            //generate new token
            $uniqid = uniqid();
            $key = hash('sha256', uniqid());
            $sql = "INSERT INTO keysTable (token) VALUES ('". $key. "');";
            if ($conn->query($sql) === TRUE) {
                //new token created
            } else {
                die('{"error": "T_CREATION"');
            }
        }

    }else{
        //no tokens avaible in db
        die('{"error": "T_GET"');
    }
} else {
    //token in session avaible
    $sql = "SELECT * FROM keysTable WHERE token = '".$_SESSION['token']."' AND reserved = 1 LIMIT 1;";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        die('{"setup": "'.$_SESSION["token"].'", "return": true}');
    }else{
        //token already used
        die('{"setup": "emptyToken"}');
    }
}



CloseCon($conn);
?>