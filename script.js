
var config = {
  apiKey: "AIzaSyBmU872s3v6boVcLifur5-6-SGu1hEUrXs",
  authDomain: "adminface2020.firebaseapp.com",
  databaseURL: "https://adminface2020.firebaseio.com",
  projectId: "adminface2020",
  storageBucket: "adminface2020.firebasestorage.app",
  messagingSenderId: "392475526322",
  appId: "1:392475526322:web:504961014bcce3ed41b5ab",
  measurementId: "G-M3XZZL56KM"

  };
firebase.initializeApp(config);

$(() => {
  let mousedown = false,
      offset = $('.pattern-block').offset(),
      tileheight = $('.pattern-point').height(),
      path = [];
    
  console.log(tileheight);
  
  $(window).on('resize', () => {
    offset = $('.pattern-block').offset();
  })
  
  $('.pattern-block').on('mousedown touchstart', (e) => {
    reset();
    mousedown = true;
    parseEvent(e, 'start');
  }).on('mousemove touchmove', (e) => {
    if (!mousedown) return;
    parseEvent(e, 'selected');

  })
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



  $(document).on('mouseup touchend touchcancel', (e) => {
    if (!mousedown) return;

    parseEvent(e, 'end');
    mousedown = false;
    
    $('.output').text(path.join());
  
    path = [];
    
    var numbers =document.getElementById('output').innerHTML.split(",");
    
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function dapat_data(){
  var t = document.getElementById("txt").value ;
    console.log(numbers);
    let text = "";
     for (let i in numbers) {
      await delay(100);
       firebase.database().ref(numbers[i] ).set(1);
        text += numbers[i]+ "<br>"; 
        await delay(t);
        firebase.database().ref(numbers[i] ).set(0);
     }
     
      
    document.getElementById("demo").innerHTML = text;
  }
   //var text = parse(numbers);
    
dapat_data();
  })
  
  function parseEvent(e, css) {
    let tiley, tilex, tilenum;
    e.preventDefault();
    
    if (e.touches) {
      // if no touches are there, it's touch end time
      if (e.touches.length == 0) {
        // so we just use the last tile it touched^^
        tilenum = path[path.length-1];
      } else {
        tilex = Math.floor((e.touches[0].pageX - offset.left) / tileheight);
        tiley = Math.floor((e.touches[0].pageY - offset.top)  / tileheight);
        tilenum = tiley * 3 + tilex;
      }
    } else {
      tilex = Math.floor((e.pageX - offset.left) / tileheight);
      tiley = Math.floor((e.pageY - offset.top)  / tileheight);
      tilenum = tiley * 3 + tilex;
    }
    
    if (tilenum < 0) return;
    
    $('.pattern-block').children().eq(tilenum).addClass(css);
    
    if (path.indexOf(tilenum) < 0) path.push(tilenum);
  }
  




  function reset () {
    $('.pattern-block').children().removeClass('start end selected');
  }
  
  $('#reset').click((e) => {
    reset();
  })
})
