/**
 * Created by alex on 20.05.2017.
 */
"use strict";


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

    document.addEventListener('DOMContentLoaded', function(){
        function responsiveSlider() {

            var slideInterval = setInterval(moveRight, 4000);
            var playing = true;
            var pauseButton = document.getElementById('pause');
            var slideCount = document.querySelectorAll('#slider ul li').length;
            var slideWidth = document.documentElement.clientWidth;
            var slideHeight = document.querySelector('#slider ul li').offsetHeight;
            var UlWidth = slideCount * slideWidth;
            var sliderBox = document.querySelector("#slider");
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

            liArray.forEach(function (el) {
                el.style.cssText = "width: " + slideWidth + "px;";
            }, false);

            window.addEventListener("resize", function(event) {
                slideWidth = document.documentElement.clientWidth;
                slideHeight = document.querySelector('#slider ul li').offsetHeight;
                UlWidth = slideCount * slideWidth;

                sliderBox.style.cssText = "width: " + slideWidth + "px;" + "height:" + slideHeight + "px;";

                ul.style.cssText = "width: " + UlWidth + "px;" + "margin-left:" + (-slideWidth)
                    + "px;" + "opacity: 1;";

                liArray.forEach(function (el) {
                    el.style.cssText = "width: " + slideWidth + "px;";
                }, false);

                //console.log(slideWidth, slideCount);
            }.debounce(10));

            function moveLeft() {
                $('#slider ul').animate({
                    left: + slideWidth
                }, 2000, function () {
                    ul.insertBefore(document.querySelector("#slider ul li:last-child"), ul.childNodes[0]);
                    ul.style.left = "";
                });
            };

            function moveRight() {
                $('#slider ul').animate({
                    left: - slideWidth
                }, 2000, function () {
                    ul.appendChild(document.querySelector("#slider ul li:first-child"));
                    ul.style.left = "";
                });
            };


            document.querySelector('a.control_prev').addEventListener( "click" , function() {
                pauseSlideshow();
                moveLeft();
            });
            document.querySelector('a.control_next').addEventListener( "click" , function() {
                pauseSlideshow();
                moveRight();
            });

        }
        responsiveSlider();

        //window.addEventListener("load", function(event) { responsiveSlider() }.debounce(10));
        //window.addEventListener("resize", function(event) { responsiveSlider() }.debounce(10));
    });


})();