var windowCode = '<div class="window" id="windowXX" style="z-index: 100"><div class="toolbar" id="toolbarXX"><div class="xbutton"></div><div class="windowtitle">Window</div></div><div><div class="content" id="contentXX"><iframe src="example.com" width="256" height="240"></iframe></div><div class="windowsize"></div></div></div>';


var windowZs = 100;
var windowCounter = -1;



$(window).load(function(){
 var mousedown = false;
 
 var originalX = 0;
 var originalY = 0;

 var windowN = -1;
 
 var dragging = false;
 var sizing = false;
 
 
 $("body").mouseup(function(){
	 mousedown = false;
	 
	 dragging = false;
	 sizing = false;
	 
	 windowN = -1;
	 
	 console.log("up");
 });
 $("body").mousedown(function(e){
	 console.log(e.target)
 	mousedown = true;
	 
	 
    if(e.target.className == "xbutton"){
      			 windowN = e.target.parentElement.parentElement.id.substr(-1) * 1;
	 	
   			 removeWindow(windowN);
	} else if(e.target.parentElement.className == "toolbar"){
		 
  			 windowN = e.target.parentElement.parentElement.id.substr(-1) * 1;
		 
  			 var pos = $("#window"+windowN).position();
	 
  			 originalX = e.pageX;
  			 originalY = e.pageY;
		 		 
		 
		 dragging = true;
		 
		 windowFocus(windowN);
	 	
	 } else if(e.target.className == "windowsize"){
		 sizing = true;
  			 windowN = e.target.parentElement.parentElement.id.substr(-1) * 1;
		 
		 console.log(windowN);
		 
	 }
	 
 });
 
 $(window).mousemove(function(e){
	 if(mousedown && dragging){
		 
		 
		 var dx = e.pageX - originalX;
		 var dy = e.pageY - originalY;
		 
		 originalX = e.pageX;
		 originalY = e.pageY;
		 
		 $("#window"+windowN).css({top: '+='+dy, left: '+='+dx});
	 } else if(mousedown && sizing){
	 	
		 var twindow = $("#window"+windowN);
		
		 var pos = twindow.position();
		
		 setWindowSize(windowN, e.pageX - pos.left - 5, e.pageY - pos.top - 5);
		
	 }
 });
 
});

function setWindowSize(windowN, width, height){
 var twindow = $("#window"+windowN);
 var toolbar = $("#toolbar"+windowN);
 var content = $("#content"+windowN);
 var xbutton = 	 toolbar.children()[0];
 var frame = content.children()[0];
 var sizer = content.next();
 
 
 twindow.width(width);
 twindow.height(height);
 
 toolbar.width(width);
 
 content.width(width);
 content.height(height-16);
 
 frame.width = width;
 frame.height = height-16;

 xbutton.style.left = width-16;
 sizer[0].style.left = width-16;
}

function windowFocus(windowN){
 $("#window"+windowN)[0].style.zIndex = windowZs++;
}


function createWindow(page){
 var windowNum = ++windowCounter;
 
 var code = windowCode;
 code = code.replace(/XX/g, windowNum);
 code = code.replace(/example.com/g, page);
 
 document.body.innerHTML += code;
 
 return windowNum;
}

function removeWindow(windowNum){
 console.log("Removing "+windowNum+"...");
 
 $("#window"+windowNum).remove();
}

function windowRoot(windowNum){
 return $("#content"+windowNum).children()[0].contentWindow;
}