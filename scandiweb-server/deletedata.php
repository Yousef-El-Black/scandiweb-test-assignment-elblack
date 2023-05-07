<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: *');

// Connect to Database
include('config/db_connect.php');

$data = json_decode(file_get_contents("php://input"), true);
$deleted_ids = $data;

// Check if the input data is valid
if (is_array($deleted_ids) && !empty($deleted_ids)) {

  // Convert the array of SKUs to a string
  $sku_list = implode("', '", $deleted_ids);

  // Delete the data
  $sql = "DELETE FROM products WHERE sku IN ('$sku_list')";
  print_r($sql);
  mysqli_query($conn, $sql);

  // Return the deleted data to the client
  echo json_encode($deleted_data);
} else {
  // Return an error message to the client
  echo 'Invalid input data';
}

mysqli_close($conn);


?>