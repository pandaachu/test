'use strict';

let img_w, cwidth;
let $uploadCrop;


resizeCroppie();

$(document).ready(function(){
  uploadCroppie();
});

function uploadCroppie() {

  croppieInit();

  function readFile(input) {
    console.log('readFile')
    var filePath = $('#upload').val();
    var fileFormat = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
    if( !fileFormat.match(/.png|.jpg|.jpeg/)) {
      Swal.fire({
        text: '上傳錯誤,檔案格式必須為：png/jpg/jpeg',
        confirmButtonColor: '#ca1c1d',
      })
        $('#upload').val('');
        return ;  
    }
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('.upload-croppie').addClass('ready'); // 不能在 then 時進行， Zoom bar 會有問題
        $uploadCrop
          .croppie('bind', {
            url: e.target.result,
          })
          // .then(function () {
          // });
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      Swal.fire({
        text: '您的裝置不支援圖片上傳',
        confirmButtonColor: '#ca1c1d',
      })
    }
  }

  $('#upload').on('change', function () {
    readFile(this);
  });
}

function resizeCroppie() {
  window.addEventListener(
    'resize',
    function (event) {
      cwidth = document.documentElement.clientWidth;
      if (cwidth >= 570) {
        img_w = 397;
      } else if (cwidth < 570 && cwidth >= 414) {
        img_w = 380;
      } else if (cwidth < 414 && cwidth >= 360) {
        img_w = 345;
      } else if (cwidth < 360) {
        img_w = 300;
      }
    },
    true
  );
}

function croppieInit() {
  $uploadCrop = $('#preview').croppie({
    viewport: {
      width: img_w,
      height: img_w / 1.16,
    }
  });
}

function cropResult() {
  $uploadCrop
    .croppie('result', {
      type: 'canvas',
      size: 'viewport',
    })
    .then(function (resp) {
      localStorage.setItem('img_src', resp);
      window.location.href = 'loading.html';
    });
}


// 取消裁切
function cropCancel() {
  $uploadCrop.croppie('destroy');
  $('.upload-croppie').removeClass('ready');
  $('#upload').val(''); // 清空 input value
  croppieInit();
}