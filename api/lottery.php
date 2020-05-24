<?php
include 's4w_testconnection.php';
$conn = OpenCon();

$json = file_get_contents('php://input');
$data = json_decode($json, true);

session_start();

if(isset($data['mail']) && isset($data['sessiontoken'])){
    if (!filter_var($data['mail'], FILTER_VALIDATE_EMAIL)) {
        die('{"error": "Die angegebene E-Mail-Adresse ist ungültig."}');
    }

    $sql = "SELECT * FROM keysTable WHERE mail = '".$data['mail']."';";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        die('{"error": "Die angegebene E-Mail-Adresse ist bereits in unserer Datenbank."}');
    }else{
        $sql = "SELECT * FROM keysTable WHERE token = '".$data['sessiontoken']."' AND reserved = 1 AND NULLIF(mail, '') IS NULL LIMIT 1;";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            //add mail
                $sql = "UPDATE s4s_corona.keysTable SET mail='".$data['mail']."' WHERE token = '".$data['sessiontoken']."'";
                if ($conn->query($sql) === TRUE) {
                    die('{"success": "Deine E-Mail-Adresse wurde in die Liste hinzugefügt. Viel Glück!"}');
                } else {
                    die('{"error": "Fehler. Bitte wenden Sie sich an support@skill4school.de."}');
                }
        }else{
            die('{"error": "Anfrage ungültig"}');
        }
    }
}else{
    die('{"error": "Anfrage ungültig"}');
}



CloseCon($conn);
?>