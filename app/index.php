<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>Template</title>
	<meta name="description" content="">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<link rel="icon" type="image/png" href="favicon.png">
	<link rel="stylesheet" href="/css/main.min.css">
	<link rel="stylesheet" href="/css/slick.css">
	<script src="/js/jquery.min.js"></script>
    <script src="/js/slick.js"></script>
</head>

<body class="loaded">

<div class="main-wrapper o-green">

    <!-- HEADER -->
    <header class="main-header ">
        <!-- SLIDER -->
        <div class="main-header__slider">
            <div class="slider-item">
                <img src="/img/header-bg.jpg" alt=" " width="1200" height="600">
            </div>
            <div class="slider-item">
                <img src="/img/header-bg.jpg" alt=" " width="1200" height="600">
            </div>
            <div class="slider-item">
                <img src="/img/header-bg.jpg" alt=" " width="1200" height="600">
            </div>
        </div>
        <i class="fa fa-pause" id="pause" aria-hidden="true"></i>
        <i class="fa fa-play-circle" id="play" aria-hidden="true"></i>
        <!-- EOF SLIDER -->


        <nav class="main-nav o-green">
            <div class="main-nav__header">
                <i class="main-nav__toggle fa fa-bars" aria-hidden="true"></i>
                <a class="main-nav__brand" href="#myPage">Golden</a>
            </div>
            <div class="main-nav__navbar">
                <ul class="main-nav__content">
                    <li><a href="#home">HOME</a></li>
                    <li class="dropdown">
                        <a href="#services">SERVICES</a>
                        <ul class="sub-menu">
                            <li><a href="#">Service-1</a></li>
                            <li class="dropdown">
                                <a href="#">Service-2</a>
                                <ul class="sub-menu">
                                    <li><a href="#">Subservice 1</a></li>
                                    <li><a href="#">Subservice 2</a></li>
                                    <li><a href="#">Subservice 3</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Service-3</a></li>
                        </ul>
                    </li>
                    <li><a href="#options">OPTIONS</a></li>
                    <li><a href="#contact">CONTACT</a></li>
                </ul>
            </div>
        </nav>

        <div class="greet">
            <p>Welcome To Our Team!</p>
            <h1>NICE TO MEET YOU</h1>
        </div>
    </header>
    <!-- EOF HEADER  -->

    <!-- CONTENT -->
    <main class="content">

        <div class="wrapper">

        </div>


    </main>
    <!-- EOF CONTENT -->

</div>

<!-- FOOTER -->
<footer class="main-footer o-blue">
    <div class="container-fluid">
        <div class="row">
            <div class="main-footer__social col-sm-6 col-sm-push-3 o-blue">
                <i class="fa fa-twitter" aria-hidden="true"></i>
                <i class="fa fa-facebook" aria-hidden="true"></i>
                <i class="fa fa-pinterest-p" aria-hidden="true"></i>
                <i class="fa fa-google-plus" aria-hidden="true"></i>
            </div>
            <div class="main-footer__copyright col-sm-3 col-sm-pull-6 o-red">
                &copy; Copyright 2017
            </div>
        </div>
    </div>
</footer>
<!-- EOF FOOTER  -->



<div class="icon-load"></div>

<script src="js/main.js"></script>
<!--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-migrate/3.0.0/jquery-migrate.js" ></script>-->

<script>
    $(document).ready(function(){
//
//        $('.main-header__slider').slick({
//
//            dots: true,
//            infinite: true
//        });
        /*----------------- slider -------------------*/
        $('.main-header__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            pauseOnDotsHover: false,
            pauseOnHover: false,
            autoplaySpeed: 4000,
            dots: false,
            arrows: true,
            infinite: true
        });
        $('#pause').click(function() {
            $('.main-header__slider').slick('slickPause');
        });
        $('#play').click(function() {
            $('.main-header__slider').slick('slickPlay');
        });
        /*----------------- eof slider -------------------*/

        stickyFooter('.main-footer', '.main-wrapper');
        //navbar('.navbar__collapse', '.navbar-toggle');



    });
</script>
</body>
</html>
