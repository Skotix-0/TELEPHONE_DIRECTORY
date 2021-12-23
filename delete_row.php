<?php

    include_once('connect_bd.php');

    $remove_id = $_POST['id'];

    $query = mysqli_query($link, "DELETE FROM `td_data` WHERE `id`= '".$remove_id."' ");

    if($query){
        echo true;
    }else{
        echo false;
    }

    mysqli_close($link);