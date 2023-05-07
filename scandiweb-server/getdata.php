<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: *");



include('config/db_connect.php');



// $sql = "SELECT * FROM products";

// $result = mysqli_query($conn, $sql);

// $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
// $data = mysqli_fetch_object($result);
// $data = mysqli_fetch_array($result);
$query = "SELECT * FROM products";
$result = mysqli_query($conn, $query);

if ($result === false) {
  // handle error here
  die("Error executing query: " . mysqli_error($conn));
}

$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
// print_r($data);


print_r(json_encode($data));




mysqli_close($conn);

?>