<?php

    $host = 'localhost';
    $user_name = 'root';
    $password = 'root';
    $database = "telephone_directory";

    $link = mysqli_connect($host, $user_name, $password, $database);

    if ($link->connect_error) {
        die("Connection failed: " . $link->connect_error);
    }