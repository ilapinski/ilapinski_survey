<?php
include 's4w_testconnection.php';
$conn = OpenCon();


// $string = file_get_contents("../assets/questions_teacher.json");
// if ($string === false) {
//     // deal with error...
// }

// $json_a = json_decode($string, true);
// if ($json_a === null) {
//     // deal with error...
// }

// foreach ($json_a as $questions => $question) {
//     $question['questionId'] = $question['questionId'] + 200;
//     echo $question['questionId'];

//     $sql = "INSERT INTO s4s_corona.questionsTable (id, isTeacherQuestion, title) VALUES ('". $question['questionId']. "', 1, '". $question['questionTitle']. "');";

//     if ($conn->query($sql) === TRUE) {
//         echo "New record created successfully";
//     } else {
//         echo "Error: " . $sql . "<br>" . $conn->error;
//     }
// }

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if(isset($data['sessiontoken'])) {
    $token = $data['sessiontoken'];
    $sql = "SELECT * FROM keysTable WHERE token = '".$token."' AND reserved = 1 LIMIT 1;";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {

                $sql = "INSERT INTO userTable () VALUES ();";
                if ($conn->query($sql) === TRUE) {
                    $respondentId = $conn->insert_id;
                } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                }

            
            foreach ($data['respondentData'] as $answers => $answer) {
                $sql = "INSERT INTO answersTable (userId, questionId, answerJSON) VALUES ('". $respondentId."', '". $answer['questionId'] . "', '". json_encode($answer['answer']['data']) . "');";
                if ($conn->query($sql) === TRUE) {

                } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                }
                
            }

            //delete token
            // sql to delete a record
            $sql = "DELETE FROM keysTable WHERE token='".$token."'";

            if ($conn->query($sql) === TRUE) {
                 die('{"success": "ok"}');
            }   
        }
}else{
    die("0");
}
die('{"success": "ok"}');

CloseCon($conn);
?>