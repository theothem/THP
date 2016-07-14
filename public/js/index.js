var activeID    = 0;
var info_active = 0;    //defines whether info panel is active or not


$(window).ready(function(){
  image_container();
});

$(window).load(function(){
  load_title();
  info();
});

function info_handle(activeID){
  if (info_active == 0)
    info_onclick_open(activeID); 
  else
    info_onclick_close(activeID);
}


$(window).resize(function() {
  var   plus                = (document.getElementById("carousel_container").offsetWidth+1)*6/100;

  itemW                     = document.getElementById("carousel_container").offsetWidth+plus;
  itemH                     = document.getElementsByClassName("carousel_item")[0].offsetHeight;
  $main                     = $('.main'),
  $carouselItem             = $('.carousel_item');
  $slideShow__slideTitle    = $('.slideShow__slideTitle');
  $slideShow__slideSubTitle = $('.slideShow__slideSubTitle');
  slideSpeed                = .45;
  slideMeth                 = Power2.EaseInOut;
  html                      = document.documentElement,
  mainHeight                = $(this).height() - 100;

  $(this).css("height", mainHeight); 
  $main.css({height: mainHeight});
  $carouselItem.css({'width': itemW+'px'});
  info_onclick_close(activeID);
  animateSlideIn();
  load_title();
  info(); 
});

$(window).on("mousewheel DOMMouseScroll", function(event){
  event.preventDefault(); 
  animateSlideOut();
  var scrollTime      = 1.1; 
  var scrollDistance  = $(this).height();
  
  var delta           = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
  var scrollTop       = $(window).scrollTop();
  var finalScroll     = scrollTop - parseInt(delta*scrollDistance);

  TweenMax.to($(window), scrollTime, {
    scrollTo    : { y: finalScroll, autoKill:true },
      ease      : "Expo.easeInOut",
      overwrite : 5              
  });
});

function load_title(){
  itemH = document.getElementsByClassName("carousel_item")[0].offsetHeight;
  var title         =  $('.slideShow__slideTitle')[activeID];
  var subTitle      =  $('.slideShow__slideSubTitle')[activeID];
  
  var tl            = new TimelineLite(); 
  if (title){
    TweenLite.set(title, {perspective:400});
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

function image_container(argument) {
  //plus :  fix container width to fit scale.
  var   plus                      = (document.getElementById("carousel_container").offsetWidth+1)*6/100,
        itemW                     = document.getElementById("carousel_container").offsetWidth+plus,
        itemH                     = document.getElementsByClassName("carousel_item")[0].offsetHeight,
        mainH                     = document.getElementsByClassName("main")[0].offsetHeight,
        mainW                     = document.getElementsByClassName("main").offsetWidth,
        $carouselItem             = $('.carousel_item'),
        $main                     = $('.main'),
        $slideShow__slideTitle    = $('.slideShow__slideTitle'),
        $slideShow__slideSubTitle = $('.slideShow__slideSubTitle'),
        slideSpeed                = .45,
        slideMeth                 = Power2.EaseInOut,
        html                      = document.documentElement,
        mainHeight                = $(this).height() - 100;

  $(this)       .css("height", mainHeight); 
  $main         .css({height: mainHeight});
  $carouselItem .css({'width': itemW+'px'});
  animateSlideIn();
}

function animateSlideIn(activeID) {
  var image         =  $('.image')[0];

  var tl = new TimelineLite();    
  tl.fromTo(image, 0.6,{scale: 0.8, ease:Power2.easeOut}, {scale: 1.2, ease:Power2.easeOut},'-=0.6' )
}

var animateSlideOut = function(activeID) {
  if(activeID <0){
    return;
  }
  

  for (var i = 0; i < $('.image').length; i++) {
    if (i==activeID)
      continue;
    var image    =  $('.image')[i];
    if (image){
      var tl = new TimelineLite();
      tl.to(image, 0.01, {scale: 1, ease:Power2.easeIn}, '-=0.5' );
    }
  }
}

function info_onclick_open(activeID) {
  
  var slideShow__slideTitle     =   $('.slideShow__slideTitle')[activeID];
  var slideShow__slideSubTitle  =   $('.slideShow__slideSubTitle')[activeID];
  var image                     =   $('.image')[activeID];
  var figcaption                =   $('figcaption')[activeID];
  var carousel_item             =   $('.carousel_item')[activeID];


  carousel_item.style.position   = 'fixed';

  if (!figcaption)
    return;

  info_active = 1;

  image.style.webkitTransform                     = 'rotateY(180deg)';
  image.style.mozkitTransform                     = 'rotateY(180deg)';
  image.style.transform                           = 'rotateY(180deg)';
  
  slideShow__slideTitle.style.opacity             =  1;
  slideShow__slideTitle.style.backgroundColor     = 'transparent';
  slideShow__slideTitle.style.letterSpacing       = '5px';
  slideShow__slideTitle.style.fontFamily          = 'Gza';
  slideShow__slideTitle.style.color               = '#fff';
  slideShow__slideTitle.style.whiteSpace          = 'nowrap';

  slideShow__slideSubTitle.style.opacity          =   1;
  slideShow__slideSubTitle.style.backgroundColor  =   'rgba(0, 0, 0, 0.4)';

  figcaption.style.backfaceVisibility = 'initial';
  figcaption.style.height             = document.getElementsByClassName("carousel_item")[0].offsetHeight+'px';
  figcaption.style.width              = document.getElementsByClassName("carousel_item")[0].offsetWidth+'px';
  figcaption.style.webkitTransform    = 'rotateY(0deg)';
  
  var tl                        =   new TimelineLite(); 
  tl.to(slideShow__slideTitle, 0.6,
  {    
    ease:Circ.easeOut,
    opacity: 0.7,
    top:'0%'
  }, '-=0.3')
  .to(slideShow__slideSubTitle, 0.6,
  {    
    ease:Back.easeOut,
    opacity: 0.7,
    top: 'calc(20%)'
  }, '-=0.9')
}

function info_onclick_close(activeID) {
  
  var slideShow__slideTitle     =   $('.slideShow__slideTitle')[activeID];
  var slideShow__slideSubTitle  =   $('.slideShow__slideSubTitle')[activeID];
  var image                     =   $('.image')[activeID];
  var figcaption                =   $('figcaption')[activeID];
  var carousel_item             =   $('.carousel_item')[activeID];

  carousel_item.style.position   = 'initial';

  info_active = 0;

  image.style.webkitTransform                   = 'rotateY(0)';
  image.style.mozkitTransform                   = 'rotateY(0)';
  image.style.transform                         = 'rotateY(0)';

  slideShow__slideTitle.style.opacity           =  0.7;
  slideShow__slideTitle.style.backgroundColor   = 'rgba(0, 0, 0, 0.4)';
  slideShow__slideTitle.style.letterSpacing     = '2px';
  slideShow__slideTitle.style.fontFamily        = '-webkit-body';
  slideShow__slideTitle.style.color             = 'white';
  slideShow__slideTitle.style.whiteSpace        = 'initial';

  slideShow__slideSubTitle.style.opacity          =   0.7;
  slideShow__slideSubTitle.style.backgroundColor  =   'rgba(0, 0, 0, 0.4)';

  figcaption.style.backfaceVisibility = 'hidden';
  figcaption.style.height             = '100%';
  figcaption.style.width              = '100%';
  figcaption.style.webkitTransform    = 'rotateY(-180deg)';
  figcaption.style.mozTransform       = 'rotateY(-180deg)';
  figcaption.style.transformransform  = 'rotateY(-180deg)';


  load_title();
  animateSlideIn(activeID);
}

function info() {
  
  itemH = document.getElementsByClassName("carousel_item")[0].offsetHeight;
  var infoHr          =  $('.info_box hr');
  var info_title      =  $('.info_title');
  infoHr.css({'display':'block'});
  
  var tl            = new TimelineLite(); 
  tl.fromTo(infoHr, 0.6,
      {
        top:itemH,
        display:'none',
      },
      {    
        display:'block', 
        ease:Circ.easeOut,
        top:itemH+100
      }, '-=0.3')
  .fromTo(info_title, 0.6,
      {
        display:'none',
        top:itemH
      },
      {   
        display:'initial', 
        ease:Circ.easeOut,
        top:itemH+147,
      },'-=0.3'); 
}

