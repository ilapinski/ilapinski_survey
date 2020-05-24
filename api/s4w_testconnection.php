<?php
function OpenCon()
 {
$dbhost = "rdbms.strato.de";
$dbuser = "U4080416";
$dbpass = "3p#_-iyr2a%Eh?Y";
$db = "DB4080416";
 $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);
 
 return $conn;
 }
 
function CloseCon($conn)
 {
 $conn -> close();
 }
   
 ?>