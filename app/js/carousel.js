/**
 * Created on 20.05.2017.
 */
'use strict';


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
            var pauseButton = document.querySelector('.carousel__pause');

            //var slideWidth = document.documentElement.clientWidth;

            var sliderBox = document.querySelector('.carousel');
            var slideWidth = document.querySelector('.carousel').offsetWidth;
            //var slideHeight = document.querySelector('.carousel ul li').offsetHeight;

            //var slideHeight = document.querySelector('.carousel ul li').offsetHeight;


            var ul = document.querySelector('.carousel ul');

            console.log(ul.children.length);


            for (var k = 0, len = ul.children.length; k < len; k++) {
                var cl = ul.children[k].cloneNode(true);
                ul.appendChild(cl);
            }



            var slideCount = document.querySelectorAll('.carousel ul li').length;
            var UlWidth = slideCount * slideWidth;

            var liArray = document.querySelectorAll('.carousel ul li');

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

            pauseButton.addEventListener( 'click' , function() {
                if(playing){
                    pauseSlideshow();
                }	else { playSlideshow();}
            });

            console.log(slideWidth,/* slideHeight,*/ slideCount);


            //console.log(ul);

            //console.log(firstCln, lastCln);

            //moving last image in the beginning
            //ul.insertBefore(document.querySelector('.carousel ul li:last-child'), ul.firstChild);

            sliderBox.style.cssText = 'width: ' + slideWidth + 'px;' /*+ 'height:' + slideHeight + 'px;'*/;

            ul.style.cssText = 'width: ' + UlWidth + 'px;' + 'margin-left:' + 2*(-slideWidth)
                + 'px;' + 'opacity: 1;';

            for ( var i  = 0; i < liArray.length; i++ ) {
                liArray[i].style.cssText = 'width: ' + slideWidth + 'px;';
            }

            window.addEventListener('resize', function(event) {
                //slideWidth = document.documentElement.clientWidth;
                sliderBox.style.width = '';
                slideWidth = document.querySelector('.carousel').offsetWidth;
                //slideHeight = document.querySelector('.carousel').offsetHeight;
                UlWidth = slideCount * slideWidth;

                sliderBox.style.cssText = 'width: ' + slideWidth + 'px;'/* + 'height:' + slideHeight + 'px;'*/;

                ul.style.cssText = 'width: ' + UlWidth + 'px;' + 'margin-left:' + 2*(-slideWidth)
                    + 'px;' + 'opacity: 1;';

                for ( var i  = 0; i < liArray.length; i++ ) {
                    liArray[i].style.cssText = 'width: ' + slideWidth + 'px;';
                }
                console.log('slw', 'slHe', 'slcound');
                console.log(slideWidth,/* slideHeight,*/ slideCount);
            }.debounce(10));

            function moveLeft() {
                $('.carousel ul').animate({
                    left: + slideWidth
                }, 300, function () {
                    ul.insertBefore(document.querySelector('.carousel ul li:last-child'), ul.childNodes[0]);
                    ul.style.left = '';
                });
            };

            function moveRight() {
                $('.carousel ul').animate({
                    left: - slideWidth
                }, 300, function () {
                    ul.appendChild(document.querySelector('.carousel ul li:first-child'));
                    ul.style.left = '';
                });
            };

            function moveRightAuto() {
                $('.carousel ul').animate({
                    left: - slideWidth
                }, 2000, function () {
                    ul.appendChild(document.querySelector('.carousel ul li:first-child'));
                    ul.style.left = '';
                });
            };

            document.querySelector('.services .prev').addEventListener( 'click' , function(e) {
                e.stopPropagation();
                pauseSlideshow();
                moveLeft();
            });
            document.querySelector('.services .next').addEventListener( 'click' , function(e) {
                e.stopPropagation();
                pauseSlideshow();
                moveRight();
            });

        }
        responsiveSlider();

    })();

