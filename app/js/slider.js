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

    }

