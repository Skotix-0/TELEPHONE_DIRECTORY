$(document).ready(function() {
  set_data_rows();

  //Cursor float left
  $("#phone_input_table").click(function(){
    $(this).setCursorPosition(3);
  }).mask("8 (999) 999 99-99");

});

//Mask for input phone
$.fn.setCursorPosition = function(pos) {
  if ($(this).get(0).setSelectionRange) {
    $(this).get(0).setSelectionRange(pos, pos);
  } else if ($(this).get(0).createTextRange) {
    var range = $(this).get(0).createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
};

function set_data_rows (){
  $.ajax({
    url: './select_data_rows.php',
    method: 'post',
    success: function(data){
      if(data !== '0'){
        $('#tBody_list').html(data);

        $(".phone_input").click(function(){
          $(this).setCursorPosition(3);
        }).mask("8 (999) 999 99-99");
      }
    }
  });
}

// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

//preventDefault form 
let pop_up = document.querySelector('.pop_up');

let form = document.querySelector('#pop_up_form');
let form_child = document.querySelectorAll('.form_child');
let complete_block = document.querySelector('.complete_block');

let edit_mode = {
  mode: false,
  index: null,
};

form.addEventListener('submit', function(event) {
	event.preventDefault();

  $.ajax({
    url: './add_phone.php',
    method: 'post',
    data: { FIO: $('#FIO_input').val(), phone_number: $('#phone_input_table').val(), who_is_it: $('#who_is_it_input').val() },
    success: function(data){
      if(data == true || data == 1){

        for(let i = 0; i < form_child.length; i++){
          form_child[i].style.opacity = 0;
          form_child[i].style.zIndex = -2;
        }
      
        form.style.height = '200px';
        document.querySelector('#add_btn_form').style.display = 'none';
      
        complete_block.style.opacity = 1;
        complete_block.style.zIndex = 2;

        set_data_rows();
      
        setTimeout(()=>{
          pop_up.style.opacity = 0;
          pop_up.style.zIndex = -2;
          document.body.style.overflowY = 'scroll';
      
          setTimeout(()=>{
            complete_block.style.opacity = 0;
            complete_block.style.zIndex = -2;
      
            for(let i = 0; i < form_child.length; i++){
              form_child[i].style.opacity = 1;
              form_child[i].style.zIndex = 2;
            }
          
            form.style.height = '500px';
      
            document.querySelector('#add_btn_form').style.display = 'flex';
          }, 500);
          
        }, 1500);

      }
    }
  });

});

//Open Pop Up
document.querySelector('#button_add_phone').addEventListener('click', () =>{

  if(edit_mode.mode == false){
    pop_up.style.zIndex = 2;
    pop_up.style.opacity = 1;
    document.body.style.overflowY = 'hidden';
  }else{
    off_edit_mode(edit_mode.index);
  }

});

//Close Pop Up

document.querySelector('.exit_form').addEventListener('click', ()=>{
  pop_up.style.opacity = 0;
  pop_up.style.zIndex = -2;
  document.body.style.overflowY = 'scroll';
});

//Open pop up del row
let pop_up_del_row = document.querySelector('.pop_up_del_btn');

function del_pop_up (index){

  if(edit_mode.mode == false){
    pop_up_del_row.style.zIndex = 2;
    pop_up_del_row.style.opacity = 1;
    document.body.style.overflowY = 'hidden';

    document.querySelector('#del_pop_up').setAttribute('onclick', `del_row(${index})`);
  }else{
    off_edit_mode(edit_mode.index);
  }
}

//function delete row data from data base
function del_row (index){
  $.ajax({
    url: './delete_row.php',
    method: 'post',
    data: {id: index},
    success: function(data){
      if(data == true || data == 1){
        set_data_rows();
      }
    }
  });

  //hidden delete pop up
  pop_up_del_row.style.opacity = 0;
  pop_up_del_row.style.zIndex = -2;
  document.body.style.overflowY = 'scroll';

  document.querySelector('#del_pop_up').removeAttribute('onclick');
}

//Close pop up del row
document.querySelector('#cancel_del_pop_up').addEventListener('click', ()=>{
  pop_up_del_row.style.opacity = 0;
  pop_up_del_row.style.zIndex = -2;
  document.body.style.overflowY = 'scroll';
  document.querySelector('#del_pop_up').removeAttribute('onclick');
});

//On edit mode
function edit_row (index){

  if(edit_mode.mode == false){
    let edit_btn_block = document.querySelector(`#edit_del_btn_${index}`);
    let save_btn_block = document.querySelector(`#save_btn_block_${index}`);

    edit_btn_block.style.display = 'none';
    save_btn_block.style.display = 'flex';

    for(let i = 0; i < document.querySelectorAll(`tr#tr_${index} input`).length; i++){
      document.querySelectorAll(`tr#tr_${index}  input`)[i].style.background = 'white';
      document.querySelectorAll(`tr#tr_${index}  input`)[i].style.border = '2px solid #aaa';
      document.querySelectorAll(`tr#tr_${index}  input`)[i].style.color = 'black';

      document.querySelectorAll(`tr#tr_${index}  input`)[i].removeAttribute('readonly');
    }

    edit_mode.mode = true;
    edit_mode.index = index;

  }else{
    off_edit_mode(index);
  }
}

//Question for close edit row
let pop_up_close_edit_row = document.querySelector('.pop_up_edit_off');

function off_edit_mode (index){

  pop_up_close_edit_row.style.zIndex = 2;
  pop_up_close_edit_row.style.opacity = 1;
  document.body.style.overflowY = 'hidden';

  document.querySelector('#edit_row_off').setAttribute('onclick', `close_edit_row()`);
}

//Cancel close edit row
document.querySelector('#cancel_edit_off_pop_up').addEventListener('click', ()=>{
  pop_up_close_edit_row.style.zIndex = -2;
  pop_up_close_edit_row.style.opacity = 0;
  document.body.style.overflowY = 'scroll';

  document.querySelector('#edit_row_off').removeAttribute('onclick');
});

//Function close edit row
function close_edit_row (){
  pop_up_close_edit_row.style.zIndex = -2;
  pop_up_close_edit_row.style.opacity = 0;
  document.body.style.overflowY = 'scroll';

  document.querySelector('#edit_row_off').removeAttribute('onclick');

  let edit_btn_block = document.querySelector(`#edit_del_btn_${edit_mode.index}`);
  let save_btn_block = document.querySelector(`#save_btn_block_${edit_mode.index}`);

  edit_btn_block.style.display = 'flex';
  save_btn_block.style.display = 'none';

  for(let i = 0; i < document.querySelectorAll(`tr#tr_${edit_mode.index} input`).length; i++){
    document.querySelectorAll(`tr#tr_${edit_mode.index}  input`)[i].style.background = 'none';
    document.querySelectorAll(`tr#tr_${edit_mode.index}  input`)[i].style.border = 'none';
    document.querySelectorAll(`tr#tr_${edit_mode.index}  input`)[i].style.color = 'white';

    document.querySelectorAll(`tr#tr_${edit_mode.index}  input`)[i].setAttribute('readonly', 'true');
  }

  edit_mode.mode = false;
  edit_mode.index = null;

  set_data_rows();

}

//Save new data from edit row
function save_row(index){

  $.ajax({
    url: './update_data_row.php',
    method: 'post',
    data: { id: edit_mode.index, FIO: document.querySelectorAll(`tr#tr_${edit_mode.index} input`)[0].value, phone_number: document.querySelectorAll(`tr#tr_${edit_mode.index} input`)[1].value, who_is_it: document.querySelectorAll(`tr#tr_${edit_mode.index} input`)[2].value },
    success: function(data){
      if(data == true || data == 1){
        for(let i = 0; i < document.querySelectorAll(`tr#tr_${edit_mode.index} input`).length; i++){
          document.querySelectorAll(`tr#tr_${edit_mode.index}  input`)[i].style.background = 'none';
          document.querySelectorAll(`tr#tr_${edit_mode.index}  input`)[i].style.border = 'none';
          document.querySelectorAll(`tr#tr_${edit_mode.index}  input`)[i].style.color = 'white';
      
          document.querySelectorAll(`tr#tr_${edit_mode.index}  input`)[i].setAttribute('readonly', 'true');
        }

        let edit_btn_block = document.querySelector(`#edit_del_btn_${edit_mode.index}`);
        let save_btn_block = document.querySelector(`#save_btn_block_${edit_mode.index}`);

        edit_btn_block.style.display = 'flex';
        save_btn_block.style.display = 'none';

        edit_mode.mode = false;
        edit_mode.index = null;
      }
    }
  });

}


