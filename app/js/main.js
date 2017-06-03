'use strict';

/*------------------------------------------------------------------------------
 DEBOUNCE
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
 MODAL INFO
 ------------------------------------------------------------------------------*/
(function () {

    // Get the modals
    var personInfo = document.querySelector('#personInfo');

// Get the button that opens the modal
    var btn = document.getElementById('modalBtn');

    // When the user clicks the button, open the modal
    btn.onclick = function () {
        personInfo.style.display = 'block';
    }

    // Get the <span> element that closes the modal
    var span = document.querySelector('#personInfo .close');

    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click', function (event) {
        personInfo.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == personInfo) {
            personInfo.style.display = 'none';
        }
    });

})();


/*---------------------------------------------------------------

 CUSTOM

 ----------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        document.querySelector('body').classList.add('ios');
    }
    ;
    document.querySelector('body').classList.remove('loaded');
});


$(function () {
    /* placeholder*/
    $('input, textarea').each(function () {
        var placeholder = $(this).attr('placeholder');
        $(this).focus(function () {
            $(this).attr('placeholder', '');
        });
        $(this).focusout(function () {
            $(this).attr('placeholder', placeholder);
        });
    });
    /* placeholder*/
});


/*---------------------------------------------------------------

                             NAVBAR

 ----------------------------------------------------------------*/
(function () {
    var btn = document.querySelector('.main-nav__toggle');
    var nav = document.querySelector('.main-nav');
    var navbar = document.querySelector('.main-nav__navbar');

    btn.addEventListener('click', function (event) {
        event.stopPropagation();

        if (nav.classList.contains('opened')) {
            nav.classList.remove('opened');
            navbar.classList.remove('opened');
            return;
        } else {
            nav.classList.add('opened');
            navbar.classList.add('opened');
            return;
        }

    }.debounce(200));

    /* ---------------------- remove nav when click on li ---------------------- */
    function remNav() {
        var li = document.querySelectorAll('.main-nav__content li ');  // array of li elements

        for (var i = 0; i < li.length; i++) {
            var link = li[i];
            handleClick(link, i);
        }

        function handleClick(link, index) {

            link.addEventListener('click', function (e) {
                if (!link.classList.contains('dropdown')) {
                    navbar.classList.remove('opened');
                    nav.classList.remove('opened');
                }
            });
        }
    }
    remNav();
})();


/*------------------------------------------------------------------------------

                        DEBOUNCE

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

/* -----------------------------------------------------------------------------

                            STICKY FOOTER

 ----------------------------------------------------------------------------- */

function stickyFooter(footerContainer, wrapCont) {

    function stick() {
        var footerHeight = document.querySelector(footerContainer).offsetHeight;
        document.querySelector(footerContainer).style.cssText = 'margin-top: -' + footerHeight + 'px;';
        document.querySelector(wrapCont).style.cssText = 'padding-bottom: ' + footerHeight + 'px;';
    }

    window.addEventListener('load', function (event) {
        stick()
    }.debounce(10));
    window.addEventListener('resize', function (event) {
        stick()
    }.debounce(10));

}

/*---------------------------------------------------------------

                        SEND REQUEST

 ----------------------------------------------------------------*/

(function () {

    document.querySelector("#contactForm").addEventListener("submit", function(e) {

        document.querySelector('.icon-load').style.display = 'block';

        /*-------------------- getting options ------------------------------------*/
        var choosenOptions = document.querySelectorAll('.chosen li');

        var dataOpt = [];
        for (var x = 0; x < choosenOptions.length; x++) {
            var link = choosenOptions[x];
            dataOpt.push(choosenOptions[x].textContent);
        }
        /*-------------------- end getting options ------------------------------------*/
        var formData = new FormData(document.querySelector('#contactForm'));
        formData.append('chosenOption', dataOpt);

        var xhttp = new XMLHttpRequest();

        xhttp.open("POST", "form.php", true);

        xhttp.onload = function(oEvent) {
            if (xhttp.status == 200) {
                document.querySelector('.icon-load').style.display = 'none';
                document.querySelector('#contactModal').style.display = 'block';
            } else {
                alert("Error! not sent!");
            }
        };
        xhttp.send(formData);
        e.preventDefault();
    });
})();

/*------------------------------------------------------------------------------
 MODAL SEND
 ------------------------------------------------------------------------------*/
(function () {

    // Get the modals
    var sendModal = document.querySelector('#contactModal');


    // Get the <span> element that closes the modal
    var span = document.querySelector('#contactModal .close');

    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click', function (event) {
            sendModal.style.display = 'none';
    });


    window.addEventListener('click', function (event) {
        if (event.target == sendModal) {
            sendModal.style.display = 'none';
        }
    });

})();


/*------------------------------------------------------------------------------
 SCROLL DOWN ANIM
 ------------------------------------------------------------------------------*/

function addAnimClass(elemClass, animClass) {
    function calcDistance(e) {
        var elms = document.querySelectorAll(elemClass);  // array of li elements
        for (var i = 0; i < elms.length; i++) {
            var el = elms[i];
            doSmth(el);
        }

        function doSmth(el) {
            if (el.getBoundingClientRect().top < 600) {

                if (window.getComputedStyle(el).visibility == 'hidden') {
                    el.classList.add(animClass);
                }
            }
        }
    }

    window.addEventListener('scroll', function (event) {
        calcDistance()
    }.debounce(10));
}

(function () {
    function calcDistance(e) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById('toTopBtn').style.display = 'block';
        } else {
            document.getElementById('toTopBtn').style.display = 'none';
        }
    }

    window.addEventListener('scroll', function (event) {
        calcDistance()
    }.debounce(10));
})();
/*------------------------------------------------------------------------------
 SMOOTH SCROLL
 ------------------------------------------------------------------------------*/

// Add smooth scrolling to all links in navbar + footer link
$('.main-nav__navbar a, #toTopBtn').on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 600, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    } // End if
});
