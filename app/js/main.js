 "use strict";


 /*------------------------------------------------------------------------------

  MODAL

  ------------------------------------------------------------------------------*/






 // Get the modal
 var modal = document.getElementById('myModal');

 // Get the button that opens the modal
 var btn = document.getElementById("myBtn");

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];

 // When the user clicks the button, open the modal
 btn.onclick = function() {
     modal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 span.onclick = function() {
     modal.style.display = "none";
 }

 // window.onclick = function(event) {
 //     if (!event.target.matches('#myModal')) {
 //         modal.style.display = "none";
 //     }
 // }

 // When the user clicks anywhere outside of the modal, close it
 // window.onclick = function(event) {
 //     if (event.target == modal) {
 //         modal.style.display = "none";
 //     }
 // }

 //var bb = document.querySelector('body');

 window.addEventListener("click", function(event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
     //alert(event.target);
     //document.querySelector('.main-nav__navbar').classList.toggle('opened');
 });

 // window.addEventListener("click", function(event) {
 //     // if (event.target == modal) {
 //     //     modal.style.display = "none";
 //     // }
 //     //alert(event.target);
 //     //document.querySelector('.main-nav__navbar').classList.toggle('opened');
 //     function myFunction(event) {
 //         alert(event.target.className);
 //     }
 //     myFunction(event);
 // });


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
             document.querySelector('.count').appendChild(document.createTextNode(counter));
             modal.style.display = 'block';
             counter++;
             setCookie("user", counter, "30");
         }
         return counter;
     }
//console.log(showModal()+'shm');
     //document.cookie = "aa=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
 })();


/*---------------------------------------------------------------

						CUSTOM
						
----------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        document.querySelector('body').classList.add('ios');
    };
    document.querySelector('body').classList.remove('loaded');
    //setTimeout(function(){document.querySelector('body').classList.remove('loaded'); }, 2000);
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

     $('.dropdown').on('click', function(event) {
         event.preventDefault();
         event.stopPropagation();
         $(this).children('.sub-menu').slideToggle(200);
         $(this).siblings().children('.sub-menu').hide();
     });

     window.addEventListener("click", function(event) {
         if (!event.target.matches('.dropdown, .sub-menu')) {
             $('.sub-menu').each(function(){
                 $(this).slideUp(200);
             });
         }
         //alert(event.target);
         //document.querySelector('.main-nav__navbar').classList.toggle('opened');
     });
     // window.onclick = function(event) {
     //     if (!event.target.matches('.dropdown, .sub-menu')) {
     //         $('.sub-menu').each(function(){
     //             $(this).slideUp(200);
     //         });
     //     }
     // }

     var btn = document.querySelector('.main-nav__toggle');

     btn.addEventListener("click", function() {
         document.querySelector('.main-nav__navbar').classList.toggle('opened');
     });




     //
     // $( '.dropdown' ).hover(
     //     function(){
     //         $(this).children('.sub-menu').slideDown(200, function () {
     //             if ($( this ).css( 'display') === 'none' ) {
     //                 $(this).removeAttr('style');
     //             }
     //         });
     //     },
     //     function(){
     //         $(this).children('.sub-menu').slideUp(200, function () {
     //             if ($( this ).css( 'display') === 'none' ) {
     //                 $(this).removeAttr('style');
     //             }
     //         });
     //     }
     // );
     //
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

 /*---------------------------------------------------------------

                            SLIDER

  ----------------------------------------------------------------*/
//  (function() {
//
//      var slides = document.querySelectorAll('#slides .slide');
//      var currentSlide = 0;
//      var slideInterval = setInterval(nextSlide,2000);
//
//      function nextSlide(){
//
// debugger;
//          slides[currentSlide].className = 'slide';
//          currentSlide = (currentSlide+1)%slides.length;
//          slides[currentSlide].className = 'slide showing';
//      }
//
//  })();

 // document.addEventListener('DOMContentLoaded', function(){
//      function responsiveSlider() {
//          var slideInterval = setInterval(moveRight, 4000);
//          var playing = true;
//          var pauseButton = document.getElementById('pause');
//          var slideCount = document.querySelectorAll('#slider ul li').length;
//          var slideWidth = document.querySelector('#slider ul li').offsetWidth;
//          //var slideWidth = Math.max( document.documentElement.clientWidth, window.innerWidth ); // window width
//          var slideHeight = document.querySelector('#slider ul li').offsetHeight;
//          var sliderUlWidth = slideCount * slideWidth;
//          var sliderBox = document.querySelector("#slider");
//          var ul = document.querySelector("#slider ul");
//
//          function pauseSlideshow(){
//              pauseButton.innerHTML = '&#9658;'; // play character
//              playing = false;
//              clearInterval(slideInterval);
//          }
//
//          function playSlideshow(){
//              pauseButton.innerHTML = '&#10074;&#10074;'; // pause character
//              playing = true;
//              slideInterval = setInterval(moveRight, 4000);
//          }
//
//          pauseButton.addEventListener( "click" , function() {
//              if(playing){
//                  pauseSlideshow();
//              }	else { playSlideshow();}
//          });
//
//
//
//          sliderBox.style.cssText = "width: " + slideWidth + "px;" + "height:" + slideHeight + "px;";
//
//          ul.style.cssText = "width: " + sliderUlWidth + "px;"
//              + "margin-left:" + (-slideWidth)+ "px;";
//
// // moving last image in the beginning
//          ul.insertBefore(document.querySelector("#slider ul li:last-child"), ul.firstChild);
//
//
//          function moveLeft() {
//              // $('#slider ul').animate({
//              //     left: + slideWidth
//              // }, 2000, function () {
//              //     // $('#slider ul li:last-child').prependTo('#slider ul');
//              //
//              //     ul.insertBefore(document.querySelector("#slider ul li:last-child"), ul.childNodes[0]);
//              //     //list.insertBefore(newItem, list.childNodes[0]);
//              //     $('#slider ul').css('left', '');
//              // });
//
//              ul.insertBefore(document.querySelector("#slider ul li:last-child"), ul.childNodes[0]);
//          };
//
//          function moveRight() {
//              // $('#slider ul').animate({
//              //     left: - slideWidth
//              // }, 2000, function () {
//              //     // $('#slider ul li:first-child').appendTo('#slider ul');
//              //     ul.appendChild(document.querySelector("#slider ul li:first-child"));
//              //     $('#slider ul').css('left', '');
//              // });
//
//              ul.appendChild(document.querySelector("#slider ul li:first-child"));
//          };
//
//
//          document.querySelector('a.control_prev').addEventListener( "click" , function() {
//              pauseSlideshow();
//              moveLeft();
//          });
//          document.querySelector('a.control_next').addEventListener( "click" , function() {
//              pauseSlideshow();
//              moveRight();
//          });
//          console.log(slideWidth);
//      }
//  responsiveSlider();

     //window.addEventListener("load", function(event) { responsiveSlider() }.debounce(10));
     //window.addEventListener("resize", function(event) { responsiveSlider() }.debounce(10));
 // });







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

						attach
						
----------------------------------------------------------------*/

(function() {

  // var a = document.querySelector('.attach__button');
  // var num = 0;
  //
  // a.addEventListener("change", function() {
  //
  //   for (var i = 0; i < this.files.length; i++) num++;
  //
  //   document.querySelector('.attach__val').innerHTML = num;
  //
  // });
  
})();

/*---------------------------------------------------------------

						SEND REQUEST
						
----------------------------------------------------------------*/

(function() {
  
  $("#mainform").on('submit' , function(e) {
    //alert('fff');
    $('.icon-load').show();
    var formObj = $(this);
    //var formURL = formObj.attr("action");
    var formData = new FormData(this);
    $.ajax({
    url: "send.php",
    type: 'POST',
    data:  formData,
    mimeType:"multipart/form-data",
    contentType: false,
    cache: false,
    processData:false,
    success: function(data, textStatus, jqXHR) {
      $('.icon-load').hide();
       $('#contactModal').modal('show');

    },
    error: function(jqXHR, textStatus, errorThrown) {
       
    }          
  });
      e.preventDefault(); //Prevent Default action.
      return false;
  }); 
  
  
  /*----------------------- callback form -----------------------------*/
  $("#secondForm").on('submit' , function(e) {
    //alert('fff');
    $('.icon-load').show();
    var formObj = $(this);
    //var formURL = formObj.attr("action");
    var formData = new FormData(this);
    $.ajax({
    url: "send.php",
    type: 'POST',
    data:  formData,
    mimeType:"multipart/form-data",
    contentType: false,
    cache: false,
    processData:false,
    success: function(data, textStatus, jqXHR) {
      $('.icon-load').hide();
       $('#contactModal').modal('show');

    },
    error: function(jqXHR, textStatus, errorThrown) {
       
    }          
  });
      e.preventDefault(); //Prevent Default action.
      return false;

  }); 
  /*----------------------- eof callback form -----------------------------*/

})();

