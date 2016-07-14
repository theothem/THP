<!DOCTYPE html>
<html>
    <head>
        <title>iWorx Portfolio</title>
        <!-- css -->
        <link rel = "stylesheet" href = "http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="css/index.css">
        <!-- js -->
        <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
        <script src="js/jquery.mobile-1.4.5.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/TweenMax.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/utils/Draggable.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/plugins/ScrollToPlugin.min.js"></script>
        <script type="text/javascript" src="js/modernizr-custom.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
    </head>
    <body>

    <div id="main_title">
        <p>Welcome to iWorx Portfolio!</p>
    </div>

    <div class="left_sidebar">
            
    </div>

    <div class="main">
      <div class="slideshow">
          <div id="carousel_container" class="carousel_container">
            <div class="carousel_item" id="item_0" onclick="info_handle(0);return false;">
              <img class="image" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/231648/MB_CLA_1.jpg" />
              <h2 class="slideShow__slideTitle"><a href="https://www.iworx.gr/" target="_blank">iWorx</a></h2>
              <div class="slideShow__slideSubTitle"><a href="https://www.iworx.gr/" target="_blank">- Web Design & Development</a></div>
              <figcaption>
                <div class="info_text">
                  <h2>This is a cool title!</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                </div>
                <div class="info_img">
                  <img class="imageFig" src="images/img1.png">
                </div>
              </figcaption>
            </div>
            <div class="info_box">
              <hr class="info_hr">
              <a class="info_title" onclick="info_handle(0);return false;">Info</a>
            </div>
          </div>
      </div>
    </div>

    <div class="right_sidebar"> 
    </div>
                    
    </body>
</html>