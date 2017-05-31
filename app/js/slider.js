/**
 * Created on 20.05.2017.
 */
'use strict';

var respSlider;
(function () {
/*------------------------------------------------------------------------------

                    SLIDER (for main image)

 ------------------------------------------------------------------------------*/
    function resposiveSlider(sliderBox) {
        var next = document.querySelector(sliderBox + ' .next');
        var previous = document.querySelector(sliderBox + ' .prev');
        var slides = document.querySelectorAll(sliderBox + ' .slide');
        var currentSlide = 0;
        var slideInterval = setInterval(nextSlide, 3000);

        function nextSlide(){
            goToSlide(currentSlide+1);
        }

        function previousSlide(){
            goToSlide(currentSlide-1);
        }

        function goToSlide(n){
            slides[currentSlide].classList.remove('show');
            currentSlide = (n+slides.length)%slides.length;
            slides[currentSlide].classList.add('show');
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
            slideInterval = setInterval(nextSlide, 3000);
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
    respSlider = resposiveSlider;
})();