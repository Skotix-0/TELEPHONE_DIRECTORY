<?php

    include_once('connect_bd.php');

    $FIO = $_POST['FIO'];
    $phone = $_POST['phone_number'];
    $who_is_it = $_POST['who_is_it'];


    $query = mysqli_query($link, "INSERT INTO `td_data` SET `FIO`= '".$FIO."', `phone_number` = '".$phone."', `who_is_it` = '".$who_is_it."' " );

    if($query){
        echo true;
    }else{
        echo false;
    }

    mysqli_close($link);