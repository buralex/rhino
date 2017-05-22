 "use strict";


 /*------------------------------------------------------------------------------
                        MODAL INFO
  ------------------------------------------------------------------------------*/
 (function() {

 // Get the modals
 var personInfo = document.querySelector('#personInfo');

// Get the button that opens the modal
 var btn = document.getElementById("modalBtn");

 // When the user clicks the button, open the modal
 btn.onclick = function() {
     personInfo.style.display = "block";
 }

 // Get the <span> element that closes the modal
 var span = document.querySelector("#personInfo .close");

 // When the user clicks on <span> (x), close the modal
 span.addEventListener("click", function(event) {
     personInfo.style.display = "none";
 });

 window.addEventListener("click", function(event) {
     if (event.target == personInfo) {
         personInfo.style.display = "none";
     }
 });

 })();

 /*------------------------------------------------------------------------------

                        COUNTER (COOKIE)

  ------------------------------------------------------------------------------*/
 (function() {

     function setCookie(cname, cvalue, exdays) {
         var d = new Date();
         d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
         var expires = "expires="+d.toUTCString();
         document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
     }

     function getCookie(cname) {
         var name = cname + "=";
         var ca = document.cookie.split(';'); //cookie array
         for(var i = 0; i < ca.length; i++) {
             var c = ca[i];
             while (c.charAt(0) == ' ') {
                 c = c.substring(1);
             }
             if (c.indexOf(name) == 0) {
                 return c.substring(name.length, c.length);
             }
         }
         return "";
     }

     var personInfo = document.querySelector('#personInfo');
// checking 3 times
     function showModal() {
         var counter;
         if (getCookie("user") != "" ) {
             counter = Number(getCookie("user"));
         } else {
             setCookie("user", 1, "30");
             counter = Number(getCookie("user"));
         }

         if (counter < 4 && counter != 0 ) {
             document.querySelector('.count').appendChild(document.createTextNode(" " + counter));
             personInfo.style.cssText = 'display: block;';
             counter++;
             setCookie("user", counter, "30");
         }
         return counter;
     }
     showModal();
     //document.cookie = "user; expires=Thu, 18 Dec 2013 12:00:00 UTC";
 })();


/*---------------------------------------------------------------

						CUSTOM
						
----------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        document.querySelector('body').classList.add('ios');
    };
    document.querySelector('body').classList.remove('loaded');
});


$(function(){
	/* placeholder*/	   
	$('input, textarea').each(function(){
 		var placeholder = $(this).attr('placeholder');
 		$(this).focus(function(){ $(this).attr('placeholder', '');});
 		$(this).focusout(function(){			 
 			$(this).attr('placeholder', placeholder);  			
 		});
 	});
	/* placeholder*/
});

 /*---------------------------------------------------------------

                         SLIDER

  ----------------------------------------------------------------*/




 /*---------------------------------------------------------------

                         NAVBAR

  ----------------------------------------------------------------*/
 (function() {
     var btn = document.querySelector('.main-nav__toggle');

     btn.addEventListener("click", function() {
         document.querySelector('.main-nav__navbar').classList.toggle('opened');
     });

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
        document.querySelector(footerContainer).style.cssText = "margin-top: -" + footerHeight + "px;";
        document.querySelector(wrapCont).style.cssText = "padding-bottom: " + footerHeight + "px;";
    }
	
   window.addEventListener("load", function(event) { stick() }.debounce(10));
   window.addEventListener("resize", function(event) { stick() }.debounce(10));
   
}

/*---------------------------------------------------------------

						SEND REQUEST
						
----------------------------------------------------------------*/

(function() {
  
  $("#contactForm").on('submit' , function(e) {

    $('.icon-load').show();

    var formData = new FormData(this);
    $.ajax({
    url: "form.php",
    type: 'POST',
    data:  formData,
    mimeType:"multipart/form-data",
    contentType: false,
    cache: false,
    processData:false,
    success: function(data, textStatus, jqXHR) {
      $('.icon-load').hide();
        document.querySelector('#contactModal').style.display = "block";
    },
    error: function(jqXHR, textStatus, errorThrown) {
       
    }          
  });
      e.preventDefault(); //Prevent Default action.
      return false;
  }); 
  
})();

 /*------------------------------------------------------------------------------
                                    MODAL SEND
  ------------------------------------------------------------------------------*/
 (function() {

     // Get the modals
     var sendModal = document.querySelector('#contactModal');


     // Get the <span> element that closes the modal
     var span = document.querySelector("#contactModal .close");

     // When the user clicks on <span> (x), close the modal
     span.addEventListener("click", function(event) {
         sendModal.style.display = "none";
     });

     window.addEventListener("click", function(event) {
         if (event.target == sendModal) {
             sendModal.style.display = "none";
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

                  if (window.getComputedStyle(el).visibility == "hidden") {
                      el.classList.add(animClass);
                  }
              }
          }
      }
     window.addEventListener("scroll", function(event) { calcDistance() }.debounce(10));
 }

 (function () {
     function calcDistance(e) {
         if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
             document.getElementById("toTopBtn").style.display = "block";
         } else {
             document.getElementById("toTopBtn").style.display = "none";
         }
     }
     window.addEventListener("scroll", function(event) { calcDistance() }.debounce(10));
 })();
 /*------------------------------------------------------------------------------
                               SMOOTH SCROLL
  ------------------------------------------------------------------------------*/

 // Add smooth scrolling to all links in navbar + footer link
 $(".main-nav__navbar a, #toTopBtn").on('click', function(event) {
     // Make sure this.hash has a value before overriding default behavior
     if (this.hash !== "") {
         // Prevent default anchor click behavior
         event.preventDefault();

         // Store hash
         var hash = this.hash;

         $('html, body').animate({
             scrollTop: $(hash).offset().top
         }, 600, function(){

             // Add hash (#) to URL when done scrolling (default click behavior)
             window.location.hash = hash;
         });
     } // End if
 });
