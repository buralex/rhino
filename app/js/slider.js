/**
 * Created on 20.05.2017.
 */
"use strict";

/*------------------------------------------------------------------------------

                                SLIDER

 ------------------------------------------------------------------------------*/

    function resposiveSlider(sliderBox, ratio) {

        var container = document.querySelector(sliderBox + " .slides");

        var slideWidth = container.offsetWidth;
        var slideHeight = slideWidth / ratio;
        container.style.cssText = "height:" + slideHeight + "px;";
        console.log(slideWidth, slideHeight);
        var next = document.querySelector(sliderBox + ' .next');
        var previous = document.querySelector(sliderBox + ' .prev');


        window.addEventListener("resize", function(event) {
            slideWidth = container.offsetWidth;
            slideHeight = slideWidth / ratio;
            container.style.cssText = "height:" + slideHeight + "px;";

        }.debounce(10));

        // var controls = document.querySelectorAll(sliderBox + '.controls');
        //
        // for(var i=0; i<controls.length; i++){
        //     controls[i].style.display = 'inline-block';
        // }

        var slides = document.querySelectorAll(sliderBox + ' .slide');
        var currentSlide = 0;
        var slideInterval = setInterval(nextSlide, 2000);

        function nextSlide(){
            goToSlide(currentSlide+1);
        }

        function previousSlide(){
            goToSlide(currentSlide-1);
        }

        function goToSlide(n){
            slides[currentSlide].className = 'slide';
            currentSlide = (n+slides.length)%slides.length;
            slides[currentSlide].className = 'slide show';
        }

        var playing = true;
        var pauseButton = document.querySelector(sliderBox + ' .pause');

        function pauseSlideshow(){
            pauseButton.innerHTML = '&#9658;'; // play character
            playing = false;
            clearInterval(slideInterval);
        }

        function playSlideshow(){
            pauseButton.innerHTML = '&#10074;&#10074;'; // pause character
            playing = true;
            slideInterval = setInterval(nextSlide,2000);
        }

        pauseButton.onclick = function(){
            if(playing){ pauseSlideshow(); }
            else{ playSlideshow(); }
        };

        next.onclick = function(){
            pauseSlideshow();
            nextSlide();
        };
        previous.onclick = function(){
            pauseSlideshow();
            previousSlide();
        };


        /*-----------------------------------*/

        // function responsiveSlider() {
        //
        //     var slideInterval = setInterval(moveRightAuto, 4000);
        //     var playing = true;
        //     var pauseButton = document.getElementById('pause');
        //     var slideCount = document.querySelectorAll('#slider ul li').length;
        //     //var slideWidth = document.documentElement.clientWidth;
        //
        //     var sliderBox = document.querySelector("#slider");
        //     var slideWidth = document.querySelector('#slider').offsetWidth;
        //     var slideHeight = document.querySelector('#slider img').offsetHeight;
        //
        //     //var slideHeight = document.querySelector('#slider ul li').offsetHeight;
        //     var UlWidth = slideCount * slideWidth;
        //
        //     var ul = document.querySelector("#slider ul");
        //     var liArray = document.querySelectorAll("#slider ul li");
        //
        //     function pauseSlideshow(){
        //         pauseButton.innerHTML = '&#9658;'; // play character
        //         playing = false;
        //         clearInterval(slideInterval);
        //     }
        //
        //     function playSlideshow(){
        //         pauseButton.innerHTML = '&#10074;&#10074;'; // pause character
        //         playing = true;
        //         slideInterval = setInterval(moveRight, 4000);
        //     }
        //
        //     pauseButton.addEventListener( "click" , function() {
        //         if(playing){
        //             pauseSlideshow();
        //         }	else { playSlideshow();}
        //     });
        //
        //     console.log(slideWidth, slideCount);
        //
        //     //moving last image in the beginning
        //     ul.insertBefore(document.querySelector("#slider ul li:last-child"), ul.firstChild);
        //
        //     sliderBox.style.cssText = "width: " + slideWidth + "px;" + "height:" + slideHeight + "px;";
        //
        //     ul.style.cssText = "width: " + UlWidth + "px;" + "margin-left:" + (-slideWidth)
        //                        + "px;" + "opacity: 1;";
        //
        //     for ( var i  = 0; i < liArray.length; i++ ) {
        //         liArray[i].style.cssText = "width: " + slideWidth + "px;";
        //     }
        //
        //     window.addEventListener("resize", function(event) {
        //         //slideWidth = document.documentElement.clientWidth;
        //         sliderBox.style.width = "";
        //         slideWidth = document.querySelector('#slider').offsetWidth;
        //         slideHeight = document.querySelector('#slider img').offsetHeight;
        //         UlWidth = slideCount * slideWidth;
        //
        //         sliderBox.style.cssText = "width: " + slideWidth + "px;" + "height:" + slideHeight + "px;";
        //
        //         ul.style.cssText = "width: " + UlWidth + "px;" + "margin-left:" + (-slideWidth)
        //            + "px;" + "opacity: 1;";
        //
        //         for ( var i  = 0; i < liArray.length; i++ ) {
        //             liArray[i].style.cssText = "width: " + slideWidth + "px;";
        //         }
        //
        //         console.log(slideWidth, slideHeight, slideCount);
        //     }.debounce(10));
        //
        //     function moveLeft() {
        //         $('#slider ul').animate({
        //             left: + slideWidth
        //         }, 300, function () {
        //             ul.insertBefore(document.querySelector("#slider ul li:last-child"), ul.childNodes[0]);
        //             ul.style.left = "";
        //         });
        //     };
        //
        //     function moveRight() {
        //         $('#slider ul').animate({
        //             left: - slideWidth
        //         }, 300, function () {
        //             ul.appendChild(document.querySelector("#slider ul li:first-child"));
        //             ul.style.left = "";
        //         });
        //     };
        //
        //     function moveRightAuto() {
        //         $('#slider ul').animate({
        //             left: - slideWidth
        //         }, 2000, function () {
        //             ul.appendChild(document.querySelector("#slider ul li:first-child"));
        //             ul.style.left = "";
        //         });
        //     };
        //
        //     document.querySelector('.control_prev').addEventListener( "click" , function() {
        //         pauseSlideshow();
        //         moveLeft();
        //     });
        //     document.querySelector('.control_next').addEventListener( "click" , function() {
        //         pauseSlideshow();
        //         moveRight();
        //     });
        //
        // }
        // responsiveSlider();
    }

