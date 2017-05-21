/**
 * Created by alex on 20.05.2017.
 */
"use strict";
document.addEventListener('load', function(){

(function() {
/*------------------------------------------------------------------------------
                        DEBOUNCE (when resizing window)
 ------------------------------------------------------------------------------*/
Function.prototype.debounce = function (milliseconds) {
    var baseFunction = this,
        timer = null,
        wait = milliseconds;

    return function () {
        var self = this,
            args = arguments;

        function complete() {
            baseFunction.apply(self, args);
            timer = null;
        }

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(complete, wait);
    };
};

/*------------------------------------------------------------------------------

                                SLIDER

 ------------------------------------------------------------------------------*/

    //document.addEventListener('DOMContentLoaded', function(){
        function responsiveSlider() {

            var slideInterval = setInterval(moveRightAuto, 4000);
            var playing = true;
            var pauseButton = document.getElementById('pause');
            var slideCount = document.querySelectorAll('#slider ul li').length;
            //var slideWidth = document.documentElement.clientWidth;

            var sliderBox = document.querySelector("#slider");
            var slideWidth = document.querySelector('#slider').offsetWidth;
            var slideHeight = document.querySelector('#slider img').offsetHeight;

            //var slideHeight = document.querySelector('#slider ul li').offsetHeight;
            var UlWidth = slideCount * slideWidth;

            var ul = document.querySelector("#slider ul");
            var liArray = document.querySelectorAll("#slider ul li");

            function pauseSlideshow(){
                pauseButton.innerHTML = '&#9658;'; // play character
                playing = false;
                clearInterval(slideInterval);
            }

            function playSlideshow(){
                pauseButton.innerHTML = '&#10074;&#10074;'; // pause character
                playing = true;
                slideInterval = setInterval(moveRight, 4000);
            }

            pauseButton.addEventListener( "click" , function() {
                if(playing){
                    pauseSlideshow();
                }	else { playSlideshow();}
            });

            console.log(slideWidth, slideCount);

            //moving last image in the beginning
            ul.insertBefore(document.querySelector("#slider ul li:last-child"), ul.firstChild);

            sliderBox.style.cssText = "width: " + slideWidth + "px;" + "height:" + slideHeight + "px;";

            ul.style.cssText = "width: " + UlWidth + "px;" + "margin-left:" + (-slideWidth)
                               + "px;" + "opacity: 1;";

            for ( var i  = 0; i < liArray.length; i++ ) {
                liArray[i].style.cssText = "width: " + slideWidth + "px;";
            }

            window.addEventListener("resize", function(event) {
                //slideWidth = document.documentElement.clientWidth;
                sliderBox.style.width = "";
                slideWidth = document.querySelector('#slider').offsetWidth;
                slideHeight = document.querySelector('#slider img').offsetHeight;
                UlWidth = slideCount * slideWidth;

                sliderBox.style.cssText = "width: " + slideWidth + "px;" + "height:" + slideHeight + "px;";

                ul.style.cssText = "width: " + UlWidth + "px;" + "margin-left:" + (-slideWidth)
                   + "px;" + "opacity: 1;";

                for ( var i  = 0; i < liArray.length; i++ ) {
                    liArray[i].style.cssText = "width: " + slideWidth + "px;";
                }

                console.log(slideWidth, slideHeight, slideCount);
            }.debounce(10));

            function moveLeft() {
                $('#slider ul').animate({
                    left: + slideWidth
                }, 300, function () {
                    ul.insertBefore(document.querySelector("#slider ul li:last-child"), ul.childNodes[0]);
                    ul.style.left = "";
                });
            };

            function moveRight() {
                $('#slider ul').animate({
                    left: - slideWidth
                }, 300, function () {
                    ul.appendChild(document.querySelector("#slider ul li:first-child"));
                    ul.style.left = "";
                });
            };

            function moveRightAuto() {
                $('#slider ul').animate({
                    left: - slideWidth
                }, 2000, function () {
                    ul.appendChild(document.querySelector("#slider ul li:first-child"));
                    ul.style.left = "";
                });
            };

            document.querySelector('.control_prev').addEventListener( "click" , function() {
                pauseSlideshow();
                moveLeft();
            });
            document.querySelector('.control_next').addEventListener( "click" , function() {
                pauseSlideshow();
                moveRight();
            });

        }
        responsiveSlider();

    //});

})();

});