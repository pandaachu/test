let result = document.querySelector('.result');
let canvas = document.createElement('canvas');

let ctx = canvas.getContext('2d');
canvas.width = 772 / 1.484;
canvas.height = 772;

let bgImgSrc = './img/img-pic-2.png'; // 背景圖
let cropImgSrc = localStorage.getItem('img_src'); // 截圖


let img1 = new Image();
let img2 = new Image();
img1.src = bgImgSrc;
img2.src = cropImgSrc;


// 加載img1
let pm1 = new Promise((res,rej)=>{
  img1.onload = ()=>{
    res();
  }
});
// 加載img2
let pm2 = new Promise((res,rej)=>{
  img2.onload = ()=>{
    res();
  }
});


// 兩張圖片都加載完成後繪製於 Canva 中
let drawAllImg = Promise.all([pm1, pm2]).then((res)=>{
  ctx.drawImage(img2, 0, 0, 448/0.861, 448);
  ctx.drawImage(img1, 0, 0, 772/1.484, 772);
});


drawAllImg.then(()=>{
  let outputImg = new Image();
  outputImg.setAttribute('crossOrigin', 'anonymous');
  outputImg.src = ctx.canvas.toDataURL("image/jpeg", 1.0);
  result.appendChild(outputImg);
  
});