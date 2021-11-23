// 1.查找需要的页面元素
var video = document.getElementById('video');//播放标签
var jp_play = document.getElementsByClassName('jp-play')[0];//播放按钮
var jp_pause = document.getElementsByClassName('jp-pause')[0];//暂停按钮
var jp_duration = document.getElementsByClassName('jp-duration')[0];//总的播放时间
var jp_current_time = document.getElementsByClassName('jp-current-time')[0];//当前播放时间
var jp_seek_bar = document.getElementsByClassName('jp-seek-bar')[0];//总的进度条
var jp_play_bar = document.getElementsByClassName('jp-play-bar')[0];//播放的进度条 百分比调整
var jp_full_screen = document.getElementsByClassName('jp-full-screen')[0];//全屏


// 2、对整个的video 添加可以播放的事件监听
video.addEventListener('canplay', function () {

  //3、点击播放按钮 
  //   视频播放  播放按钮隐藏  暂停按钮显示
  jp_play.addEventListener('click', function () {
    video.play();
    jp_play.style.display = 'none';
    jp_pause.style.display = 'block';

  })

  //4.点击暂停按钮  视频暂停  暂停按钮隐藏  播放显示
  jp_pause.addEventListener('click', function () {
    video.pause();
    jp_play.style.display = 'block';
    this.style.display = 'none';

  })

  // 5.给总时间  添加内容 获取当前视频的总时间
  jp_duration.innerText = formatTime(video.duration);

  // 6.时间更新  设置播放的当前时间  同时  设置播放的进度条
  video.addEventListener('timeupdate',function(){
    jp_current_time.innerText = formatTime(video.currentTime);
    jp_play_bar.style.width = (video.currentTime/video.duration)*100+'%';
  })

  // 7.点击修改播放时间  点击总的播放进度条
  //    修改播放进度条样式   修改播放时间  视频播放进度
  jp_seek_bar.addEventListener('click',function(e){
    e = e|| window.event;
    var now =  e.offsetX;
    var width = jp_seek_bar.offsetWidth;

    // 修改播放进度条样式
    jp_play_bar.style.width = (now/width)*100+'%';
    jp_current_time.innerText = formatTime((now/width)*video.duration);

    video.currentTime = (now/width)*video.duration;
  })

  // 8.全屏播放
  jp_full_screen.addEventListener('click',function(){
    video.webkitRequestFullScreen();
  })
})


// 副本
//  格式化时间方法
function formatTime(time){
  // 分钟
    var m = Math.floor(time/60);
    m>9?m:m='0'+m;

  // 秒
    var s = Math.floor(time%60);
    s>9?s:s='0'+s;

    return m+':'+s;


}


