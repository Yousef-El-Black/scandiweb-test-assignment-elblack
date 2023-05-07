<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: *');

include('config/db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data)) {
  $sku = mysqli_real_escape_string($conn, $data['sku']);
  $name = mysqli_real_escape_string($conn, $data['name']);
  $price = mysqli_real_escape_string($conn, $data['price']);
  $size = mysqli_real_escape_string($conn, $data['size']);
  $height = mysqli_real_escape_string($conn, $data['height']);
  $width = mysqli_real_escape_string($conn, $data['width']);
  $length = mysqli_real_escape_string($conn, $data['length']);
  $weight = mysqli_real_escape_string($conn, $data['weight']);

  $sql = "INSERT INTO products (sku, name, price, size, height, width, length, weight) VALUES ('$sku', '$name', '$price', '$size', '$height', '$width', '$length', '$weight')";
  mysqli_query($conn, $sql);
  echo 'success';
} else {
  echo 'error';
}

mysqli_close($conn);
?>