var activeID      = 0;
var info_active   = 0;    //defines whether info panel is active or not
var max_active_id = 0;

$(window).ready(function(){
  image_container();
});

$(window).load(function(){
  load_title();
  info();
});

function info_handle(){
  if (info_active == 0){
    info_onclick_open(); 
  }
  else if (info_active == -1){
    info_active = 0;
    return;
  }
  else{
    info_onclick_close();
  }
}


$(window).resize(function() {
  var   plus                = (document.getElementById("carousel_container").offsetWidth+1)*6/100;

  itemW                     = document.getElementById("carousel_container").offsetWidth+plus;
  itemH                     = document.getElementsByClassName("carousel_item")[0].offsetHeight;
  $main                     = $('.main'),
  $carouselItem             = $('.carousel_item');
  $website                  = $('website');
  $slideShow__slideTitle    = $('.slideShow__slideTitle');
  $slideShow__slideSubTitle = $('.slideShow__slideSubTitle');
  slideSpeed                = .45;
  slideMeth                 = Power2.EaseInOut;
  html                      = document.documentElement,
  mainHeight                = $(this).height() - 100;
  max_active_id             = $('.main').height() / $('.website').height() -1;

  $(this).css("height", mainHeight); 
  //$main.css({height: mainHeight});
  //$website.css({height: mainHeight});
  $carouselItem.css({'width': itemW+'px'});
  info_onclick_close();
  animateSlideIn();
  load_title();
  info(); 
});

$(window).on("mousewheel DOMMouseScroll", function(event){
  event.preventDefault(); 

  var scrollTime      = 1.1; 
  var scrollDistance  = $('.main').height();

  max_active_id = $('.main').height() / $('.website').height() -1;
  
  var delta           = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;

  var scrollTop       = $(window).scrollTop();
  var finalScroll     = scrollTop - parseInt(delta*scrollDistance);
  
  if ((finalScroll < 0) && (scrollTop == 0)){
    //window.alert(1);
    return;
  }
  else if (finalScroll > scrollDistance){
    // window.alert(2);
    return;
  }

  info_onclick_close();
  unload_title();
  unload_info();
  animateSlideOut();


  TweenMax.to($(window), scrollTime, {
    scrollTo    : { y: finalScroll, autoKill:false },
      ease      : "Expo.easeInOut",
      delay     : 0.3,
      overwrite : 5              
  });
  
  if ((finalScroll > 0)&&(activeID < max_active_id))
    activeID++;
  else if ((finalScroll < 0)&&(activeID > 0))
    activeID--;

  animateSlideIn();
  load_title();
  info(); 

});

function unload_title() {
  itemH = document.getElementsByClassName("carousel_item")[activeID].offsetHeight;
  var title         =  $('.slideShow__slideTitle')[activeID];
  var subTitle      =  $('.slideShow__slideSubTitle')[activeID];
  
  var tl            = new TimelineLite(); 
  if (title){
    TweenLite.set(title, {perspective:400});
    tl.to(title, 0.6, 
    {   
      ease:Circ.easeOut,
      top:-200,
      opacity:.5
    }, '-=0.3');
  }
  if (subTitle)
    tl.to(subTitle, 0.6, 
    {
      ease:Back.easeOut,
      top:-200,
      opacity:.5
    }, '-=0.3');  
}

function load_title(){
  itemH = document.getElementsByClassName("carousel_item")[activeID].offsetHeight;
  var title         =  $('.slideShow__slideTitle')[activeID];
  var subTitle      =  $('.slideShow__slideSubTitle')[activeID];
  
  var tl            = new TimelineLite(); 
  if (title){
    TweenLite.set(title, {perspective:400});
    tl.fromTo(title, 0.6, 
    {
      top:0, opacity: 0
    },
    { 
      rotationX:360, 
      transformOrigin:"0% 50% -50",  
      ease:Circ.easeOut,
      top:(itemH - (itemH/6)-100),
      opacity:.5
    },'+=0.7');  
  }
  if (subTitle)
    tl.fromTo(subTitle, 0.6, 
    {
      top:0, opacity: 0
    },
    {
      rotationX:360, 
      transformOrigin:"0% 50% -50",  
      ease:Back.easeOut,
      top:(itemH - (itemH/6)),
      opacity:.5
    });
}

function image_container() {
  //plus :  fix container width to fit scale.
  var   plus                      = (document.getElementById("carousel_container").offsetWidth+1)*6/100,
        itemW                     = document.getElementById("carousel_container").offsetWidth+plus,
        itemH                     = document.getElementsByClassName("carousel_item")[activeID].offsetHeight,
        mainH                     = document.getElementsByClassName("main")[activeID].offsetHeight,
        mainW                     = document.getElementsByClassName("main").offsetWidth,
        $carouselItem             = $('.carousel_item'),
        $carousel_container       = $('.carousel_container'),
        $website                  = $('.website'),
        $slideShow__slideTitle    = $('.slideShow__slideTitle'),
        $slideShow__slideSubTitle = $('.slideShow__slideSubTitle'),
        slideSpeed                = .45,
        slideMeth                 = Power2.EaseInOut,
        html                      = document.documentElement,
        mainHeight                = $(this).height() - 100;

  $(this)       .css("height", mainHeight);
  $website      .css({height: mainHeight});
  $carouselItem .css({'width': itemW+'px'});
  animateSlideIn();
}

function animateSlideIn() {
  var image         =  $('.image')[activeID];

  var tl = new TimelineLite();    
  tl.to(image, 0.8,{scale: 1.2, ease:Power2.easeOut},'-=0.6' )
}

var animateSlideOut = function() {
  if(activeID <0){
    return;
  }

  var image         =  $('.image')[activeID];

  var tl = new TimelineLite();
  tl.to(image, 0.3, {scale: 0.8, ease:Power2.easeIn});
}

function info_onclick_open() {
  
  var slideShow__slideTitle     =   $('.slideShow__slideTitle')[activeID];
  var slideShow__slideSubTitle  =   $('.slideShow__slideSubTitle')[activeID];
  var image                     =   $('.image')[activeID];
  var figcaption                =   $('figcaption')[activeID];
  var carousel_item             =   $('.carousel_item')[activeID];


  carousel_item.style.position    = 'fixed';
  carousel_item.style.top         = '100px';

  if (!figcaption){
    return;
  }

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
    top:'0'
  }, '-=0.3')
  .to(slideShow__slideSubTitle, 0.6,
  {    
    ease:Back.easeOut,
    opacity: 0.7,
    top: 'calc(20%)'
  }, '-=0.9')
}

function info_onclick_close() {
  
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

function unload_info(){
  itemH = document.getElementsByClassName("carousel_item")[activeID].offsetHeight;
  var infoHr          =  $('.info_hr');
  var info_title      =  $('.info_title');
  
  
  var tl            = new TimelineLite(); 
  tl.to(infoHr, 0.3,
  {
    top:-100,
    display:'none'
  })
  .to(info_title, 0.3,
  {
    top:itemH+117,
    display:'none',
  });
}

function info() {
  itemH = document.getElementsByClassName("carousel_item")[activeID].offsetHeight;
  var infoHr          =  $('.info_box hr');
  var info_title      =  $('.info_title');

  var tl            = new TimelineLite(); 
  tl.fromTo(infoHr, 0.6,
      {
        top:itemH,
        display:'none',
      },
      {    
        delay:0.9,
        display:'block', 
        ease:Circ.easeOut,
        top:itemH+100
      })
  .fromTo(info_title, 0.6,
      {
        display:'none',
        top:itemH
      },
      {
        display:'initial', 
        ease:Circ.easeOut,
        top:itemH+147,
      }); 
}

function redirect_to(url){
  info_active = -1;
   window.open(url,'_blank');
}

