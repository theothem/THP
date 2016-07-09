var activeID = 0;
$(window).ready(function(){
  scroll();
  carousel();
});

$(window).load(function(){
  load_title();
});

function scroll() {
  var $window = $(window);
  var scrollTime = 1.1;
  var scrollDistance = 300;

  $window.on("mousewheel DOMMouseScroll", function(event){

    event.preventDefault(); 

    var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
    var scrollTop = $window.scrollTop();
    var finalScroll = scrollTop - parseInt(delta*scrollDistance);

    TweenMax.to($window, scrollTime, {
      scrollTo : { y: finalScroll, autoKill:true },
        ease: "Expo.easeInOut",
        overwrite: 5              
    });

  });
}

function load_title(){
  itemH = document.getElementsByClassName("carousel_item")[0].offsetHeight;
  var title         =  $('.slideShow__slideTitle')[activeID];
  var subTitle      =  $('.slideShow__slideSubTitle')[activeID];

  TweenLite.set(title, {perspective:400});
  var tl            = new TimelineLite(); 
  if (title){
    tl.fromTo(title, 0.6, {top:0, opacity: 0},
        { 
          rotationX:360, 
          transformOrigin:"0% 50% -50",  
          ease:Circ.easeOut,top:(itemH - (itemH/6)-100),
          opacity:.5
        }, '-=0.3');  
  }
  if (subTitle)
    tl.fromTo(subTitle, 0.6, {top:0, opacity: 0},
      {
        rotationX:360, 
        transformOrigin:"0% 50% -50",  
        ease:Back.easeOut,top:(itemH - (itemH/6)),
        opacity:.5
      }, '-=0.3');
}


function carousel(argument) {
  var carousel = (function () {
    
    var   itemW = document.getElementById("carousel_container").offsetWidth+1,
          itemH = document.getElementsByClassName("carousel_item")[0].offsetHeight,
          carousel_count = $('.carousel_item').length,
          $carouselItems = $('.carousel_items'),
          $carouselItem = $('.carousel_item'),
          $slideShow__slideTitle = $('.slideShow__slideTitle'),
          $slideShow__slideSubTitle = $('.slideShow__slideSubTitle'),
          $arrowPrev = $('.item_prev'),
          $arrowNext = $('.item_next'),
          $itemArrow = $('.item_arrow'),
          $navDot,
          $navDots = $('.nav_dots'),
          swipeDir,
          slideSpeed = .45,
          slideMeth = Power2.EaseInOut;
    
    $(window).resize(function() {
      //activeID = 0;
      itemW = document.getElementById("carousel_container").offsetWidth+1;
      itemH = document.getElementsByClassName("carousel_item")[0].offsetHeight;
      carousel_count = $('.carousel_item').length;
      $carouselItems = $('.carousel_items');
      $carouselItem = $('.carousel_item');
      $slideShow__slideTitle = $('.slideShow__slideTitle');
      $slideShow__slideSubTitle = $('.slideShow__slideSubTitle');
      $arrowPrev = $('.item_prev');
      $arrowNext = $('.item_next');
      $itemArrow = $('.item_arrow');
      $navDot;
      $navDots = $('.nav_dots');
      swipeDir;
      slideSpeed = .45;
      slideMeth = Power2.EaseInOut;
      resize();
    });

    function init() {
       
      $carouselItems.css({'width': (itemW * carousel_count) + 'px'});
      $navDots.css({'width': (25 * carousel_count) + 'px'});
      $carouselItem.css({'width': itemW+'px'});
      $itemArrow.css({'opacity': .8});
      setupDraggable();
      setupDots();
      navigateSlide();

    }

    function resize() {
      $carouselItems.css({'width': (itemW * carousel_count) + 'px'});
      $navDots.css({'width': (25 * carousel_count) + 'px'});
      $carouselItem.css({'width': itemW+'px'});
      $itemArrow.css({'opacity': .8});
      setupDraggable();
      navigateSlide();
    }

    init();

    function setupDraggable() { 
      Draggable.create($carouselItems, {
        type:'x',
        edgeResistance: 0.90,
        dragResistance: 0.0,
        bounds:'.carousel_container',
        onDrag:updateDirections,
        onThrowUpdate:updateDirections,
        throwProps:true,
        onDragStart:function(evt) {},
        onDragEnd :function() {

          if(swipeDir == 'left') {activeID++}
          else if(swipeDir == 'right') {activeID--};
          
          navigateSlide();
        }
      });    
    };

    // set up dots
    function setupDots() {    
      for(var i = 0; i < carousel_count; i++) {
        $navDots.append('<div class="nav_dot" id="dot_' + i + '"></div>');
      }    
      $navDot = $('.nav_dot');
    }

    function updateDirections() {
      swipeDir = this.getDirection("start");
    }

    // navigate slide
    function navigateSlide() {
    
      if(activeID >= carousel_count-1) activeID = carousel_count-1;
      if(activeID <= 0) activeID = 0;   
              
      var xTarget = ((activeID * itemW) * -1);
      TweenMax.to($carouselItems, slideSpeed, {x: xTarget, ease: slideMeth, onComplete: slideDone});
    }

    function slideDone() {
      //
      if(activeID == 0) {$arrowPrev.fadeOut()} 
      else {$arrowPrev.fadeIn()}
      
      if(activeID + 1 == carousel_count) {$arrowNext.fadeOut()}
      else {$arrowNext.fadeIn()}

      if (document.readyState === "complete"){
        load_title();
      }
    }

    $itemArrow.on('click', function() {
    
      if(Modernizr.touch) return;
      
      if($(this).hasClass('item_next')) {activeID++}
      else {activeID--};
      
      navigateSlide();
    });
    
    $itemArrow.on('touchstart', function() {
      if($(this).hasClass('item_next')) {activeID++}
      else {activeID--};
      
      navigateSlide();
    });

    $navDot.hover(    
      function() {      
          TweenMax.to($(this), .35, {scale: 1.5});
      }, function() {
         if($(this).attr('id').split('_')[1] == activeID) return;
         TweenMax.to($(this), .35, {scale: 1.0});
      }  
    );
  
    $navDot.click(function() {    
      var dotID = $(this).attr('id').split('_')[1];
      activeID = dotID;
        
      navigateSlide();    
    });

    $carouselItem.mousedown(function() {    
      activeID = $(this).attr('id').split('_')[1];
      
      $(this).removeClass('grab');
      $(this).addClass('grabbing'); 
    });
      
    $carouselItem.mouseenter(function() {        
      $(this).removeClass('grabbing');
      $(this).addClass('grab');
    });

    $carouselItem.mouseup(function() {        
      $(this).removeClass('grabbing');
      $(this).addClass('grab');
    });  
  })();
}
