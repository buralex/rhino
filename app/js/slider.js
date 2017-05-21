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
    //$(document).ready(function(){
    document.addEventListener('DOMContentLoaded', function(){
        function responsiveSlider() {

            var playing = true;
            var pauseButton = document.getElementById('pause');
            var slideCount = document.querySelectorAll('#slider ul li').length;
            var windWidth = document.documentElement.clientWidth;
            var slideWidth = document.querySelector('#slider').offsetWidth;
            var slideHeight = document.querySelector('#slider ul li').offsetHeight;
            var UlWidth = slideCount * slideWidth;
            var sliderBox = document.querySelector("#slider");
            var ul = document.querySelector("#slider ul");
            var liArray = document.querySelectorAll("#slider ul li");



            // if ( slideWidth > windWidth) {
            //     slideWidth = windWidth ;
            //     console.log('kfdjslfkjls');
            // }
            //slideWidth = (windWidth == slideWidth)? windWidth : slideWidth;

            //var slideInterval = setInterval(moveRight, 4000);
            //ul.style.opacity = 0;

            function pauseSlideshow(){
                pauseButton.innerHTML = '&#9658;'; // play character
                playing = false;
                //clearInterval(slideInterval);
            }

            function playSlideshow(){
                pauseButton.innerHTML = '&#10074;&#10074;'; // pause character
                playing = true;
                //slideInterval = setInterval(moveRight, 4000);
            }

            pauseButton.addEventListener( "click" , function() {
                if(playing){
                    pauseSlideshow();
                }	else { playSlideshow();}
            });

            console.log(slideWidth, windWidth, slideCount);

            //moving last image in the beginning
            // ul.insertBefore(document.querySelector("#slider ul li:last-child"), ul.firstChild);
            //
            // sliderBox.style.cssText = "width: " + slideWidth + "px;" + "height:" + slideHeight + "px;";
            //
            // //li.style.cssText = "width: " + slideWidth + "px;";
            //
            // ul.style.cssText = "width: " + UlWidth + "px;" + "margin-left:" + (-slideWidth)
            //                     + "px;" + "opacity: 1;";
            //
            // liArray.forEach(function (el) {
            //     el.style.cssText = "width: " + slideWidth + "px;";
            //     //console.log(el);
            // }, false);

            window.addEventListener("resize", function(event) {
                playing = true;
                pauseButton = document.getElementById('pause');
                slideCount = document.querySelectorAll('#slider ul li').length;
                windWidth = document.documentElement.clientWidth;
                slideWidth = document.querySelector('#slider').offsetWidth;
                if (slideWidth >= windWidth) {slideWidth = windWidth}

                slideHeight = document.querySelector('#slider ul li').offsetHeight;
                UlWidth = slideCount * slideWidth;
                sliderBox = document.querySelector("#slider");
                ul = document.querySelector("#slider ul");
                liArray = document.querySelectorAll("#slider ul li");
                //responsiveSlider()

                // ul.insertBefore(document.querySelector("#slider ul li:last-child"), ul.firstChild);
                //
                sliderBox.style.cssText = "width: " + slideWidth + "px;" + "height:" + slideHeight + "px;";
                //
                // //li.style.cssText = "width: " + slideWidth + "px;";
                //
                // ul.style.cssText = "width: " + UlWidth + "px;" + "margin-left:" + (-slideWidth)
                //     + "px;" + "opacity: 1;";
                //
                // liArray.forEach(function (el) {
                //     el.style.cssText = "width: " + slideWidth + "px;";
                //     //console.log(el);
                // }, false);
                console.log(slideWidth, windWidth, slideCount);
            }.debounce(10));

            function moveLeft() {
                // $('#slider ul').animate({
                //     left: + slideWidth
                // }, 2000, function () {
                //     // $('#slider ul li:last-child').prependTo('#slider ul');
                //
                //     ul.insertBefore(document.querySelector("#slider ul li:last-child"), ul.childNodes[0]);
                //     //list.insertBefore(newItem, list.childNodes[0]);
                //     $('#slider ul').css('left', '');
                // });
                console.log('moveleft');
                ul.insertBefore(document.querySelector("#slider ul li:last-child"), ul.childNodes[0]);
            };

            function moveRight() {
                // $('#slider ul').animate({
                //     left: - slideWidth
                // }, 2000, function () {
                //     // $('#slider ul li:first-child').appendTo('#slider ul');
                //     ul.appendChild(document.querySelector("#slider ul li:first-child"));
                //     $('#slider ul').css('left', '');
                // });
                console.log('moveright');
                ul.appendChild(document.querySelector("#slider ul li:first-child"));
            };


            document.querySelector('a.control_prev').addEventListener( "click" , function() {
                pauseSlideshow();
                moveLeft();
            });
            document.querySelector('a.control_next').addEventListener( "click" , function() {
                pauseSlideshow();
                moveRight();
            });
            //console.log(slideWidth);

        }
        responsiveSlider();

        //window.addEventListener("load", function(event) { responsiveSlider() }.debounce(10));
        //window.addEventListener("resize", function(event) { responsiveSlider() }.debounce(10));
    });


})();