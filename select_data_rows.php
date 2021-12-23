<?php

    include_once('connect_bd.php');

    $result = [];

    $query = mysqli_query($link, "SELECT * FROM `td_data` ");

    $num_rows = $query -> num_rows;

    if($num_rows <= 0){
        mysqli_close($link);
        echo 0;
    }else{
        $i = 0;
        while($rows = mysqli_fetch_assoc($query)){
            $result[$i] = '
                <tr id="tr_'.(int)$rows['id'].'">
                    <td aria-label="ФИО"> <input type="text" value="'.(string)$rows['FIO'].'" readonly> </td>
                    <td aria-label="Телефон"> <input class="phone_input" type="text" value="'.(string)$rows['phone_number'].'" readonly> </td>
                    <td aria-label="Кем приходится"> <input type="text" value="'.(string)$rows['who_is_it'].'" readonly> </td>
                    <td>
                    <div class="edit_del_btn" id="edit_del_btn_'.(int)$rows['id'].'">
                        <button class="button_table" onclick="del_pop_up('.(int)$rows['id'].')" id="del_btn">Удалить</button>
                        <button class="button_table" onclick="edit_row('.(int)$rows['id'].')" id="edit_btn">Редактировать</button>
                    </div>
        
                    <div class="save_btn_block" id="save_btn_block_'.(int)$rows['id'].'">
                        <button class="button_table" onclick="save_row('.(int)$rows['id'].')" id="save_vtn">Сохранить</button>
                    </div>
        
                    </td>
                </tr>
            ';
            $i = $i + 1;
        }

        mysqli_close($link);

        echo implode($result);
    }

   