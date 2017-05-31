/**
 * Created on 20.05.2017.
 */
'use strict';

var respCarousel;
(function () {
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
                                CAROUSEL
     ------------------------------------------------------------------------------*/

    var ResponsiveCarousel = function(sliderBox, ul, prev, next, pauseButton) {
        this.self = this;
        this.sliderBox = sliderBox;
        this.prev = prev;
        this.next = next;
        this.pauseButton = pauseButton;
        this.slideInterval = '';
        this.playing = true;
        this.slideWidth = sliderBox.offsetWidth;
        this.ul = ul;
        this.slideCount = '';
        this.UlWidth = '';

    };



    ResponsiveCarousel.prototype.cloneChilds = function () {
        var self = this.self;

        for (var k = 0, len = this.ul.children.length; k < len; k++) {
            var cl = this.ul.children[k].cloneNode(true);
            this.ul.appendChild(cl);
        }

    };

    ResponsiveCarousel.prototype.pauseSlideshow = function () {
        var self = this.self;

        this.pauseButton.innerHTML = '&#9658;'; // play character
        this.playing = false;
        clearInterval(this.slideInterval);
    };

    ResponsiveCarousel.prototype.playSlideshow = function () {
        var self = this.self;

        this.pauseButton.innerHTML = '&#10074;&#10074;'; // pause character
        this.playing = true;
        this.slideInterval = setInterval(function(){ self.moveRightAuto() }, 4000);
    };

    ResponsiveCarousel.prototype.inlineStyles = function () {
        var self = this.self;

        this.sliderBox.style.cssText = 'width: ' + this.slideWidth + 'px;';

        this.ul.style.cssText = 'width: ' + this.UlWidth + 'px;' + 'margin-left:' + 2 * (-this.slideWidth)
            + 'px;' + 'opacity: 1;';

        for (var i = 0; i < this.ul.children.length; i++) {
            this.ul.children[i].style.cssText = 'width: ' + this.slideWidth + 'px;';
        }
    };

    ResponsiveCarousel.prototype.resizeListener = function () {
        var self = this.self;

            window.addEventListener('resize', function (event) {
                self.sliderBox.style.width = '';
                self.slideWidth = self.sliderBox.offsetWidth;
                self.UlWidth = self.slideCount * self.slideWidth;

                self.sliderBox.style.cssText = 'width: ' + self.slideWidth + 'px;';

                self.ul.style.cssText = 'width: ' + self.UlWidth + 'px;' + 'margin-left:' + 2 * (-self.slideWidth)
                    + 'px;' + 'opacity: 1;';

                for (var i = 0; i < self.ul.children.length; i++) {
                    self.ul.children[i].style.cssText = 'width: ' + self.slideWidth + 'px;';
                }
            }.debounce(10));

    };

    ResponsiveCarousel.prototype.moveLeft = function () {
        var self = this.self;

        $(self.ul).animate({
            left: +self.slideWidth
        }, 300, function () {
            self.ul.insertBefore(self.ul.children[self.ul.children.length-1], self.ul.children[0]);
            self.ul.style.left = '';
        });
    };

    ResponsiveCarousel.prototype.moveRight = function () {
        var self = this.self;

        $(self.ul).animate({
            left: -self.slideWidth
        }, 300, function () {
            self.ul.appendChild(self.ul.children[0]);
            self.ul.style.left = '';
        });
    };

    ResponsiveCarousel.prototype.moveRightAuto = function () {
        var self = this.self;

        $(self.ul).animate({
            left: -self.slideWidth
        }, 2000, function () {
            self.ul.appendChild(self.ul.children[0]);
            self.ul.style.left = '';
        });
    };

    ResponsiveCarousel.prototype.init = function () {
        var self = this.self;
        this.cloneChilds();
        this.slideCount = ul.children.length;
        this.UlWidth = this.slideCount * this.slideWidth;
        this.inlineStyles();
        this.resizeListener();
        this.slideInterval = setInterval(function(){ self.moveRightAuto() }, 4000);

        this.pauseButton.addEventListener('click', function (e) {
            if (self.playing) {
                self.pauseSlideshow();
            } else {
                self.playSlideshow();
            }
        });

        this.prev.addEventListener('click', function (e) {
            e.stopPropagation();
            self.pauseSlideshow();
            self.moveLeft();
        });

        this.next.addEventListener('click', function (e) {
            e.stopPropagation();
            self.pauseSlideshow();
            self.moveRight();
        });
    };

    /*----------------------------------------------------------------------------------
     INITIALIZATION
     ----------------------------------------------------------------------------------- */

    var sliderBox = document.querySelector('.carousel');
    var ul = document.querySelector('.carousel ul');
    var pauseButton = document.querySelector('.carousel__pause');
    var prev = document.querySelector('.services .prev');
    var next = document.querySelector('.services .next');

    var respCarousel = new ResponsiveCarousel(sliderBox, ul, prev, next, pauseButton);
    respCarousel.init();


})();

