﻿<?php
if(!defined("access")) die(header("HTTP/1.0 404 Not Found"));
require_once "rb.php";
require_once $_SERVER["DOCUMENT_ROOT"].'/config.php';

R::setup("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASS);