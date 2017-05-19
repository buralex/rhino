 "use strict";


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

         if (getCookie("aa") != "" ) {

             var counter = Number(getCookie("aa"));

             if (counter < 3) {
                 counter++;
                 setCookie("aa", counter, "30");
                 //document.querySelector(".counter").classList.add('hidden');
                 var el = document.querySelector(".counter");
                 el.classList.add('visible');
                 //console.log(document.querySelector(".counter"));
             }
         } else {
             setCookie("aa", 1, "30");
             var el = document.querySelector(".counter");
             el.classList.add('visible');
         }
         return counter;
     }
//console.log(showModal());
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

(function() {

    document.addEventListener('DOMContentLoaded', function(){

        window.timeVar = 0; //global declaration
        function autorefresh() {
            var isChecked = document.getElementById("checkbox").checked;
            if (isChecked == true) {
                window.timeVar = setInterval(function () {
                    moveRight();
                }, 1000);
            } else if (isChecked == false) {
                clearInterval(timeVar);
            }
        }
        autorefresh();
        document.getElementById('checkbox').addEventListener('click', autorefresh);
        

        var slideCount = $('.main-header__slider ul li').length;
        var slideWidth = $('.main-header__slider ul li').width();
        var slideHeight = $('.main-header__slider ul li').height();
        var sliderUlWidth = slideCount * slideWidth;

        $('.main-header__slider').css({ maxWidth: slideWidth, height: slideHeight });

        $('.main-header__slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

        $('.main-header__slider ul li:last-child').prependTo('.main-header__slider ul');

        function moveLeft() {
            $('.main-header__slider ul').animate({
                left: + slideWidth
            }, 1000, function () {
                $('.main-header__slider ul li:last-child').prependTo('.main-header__slider ul');
                $('.main-header__slider ul').css('left', '');
            });
        };

        function moveRight() {
            $('.main-header__slider ul').animate({
                left: - slideWidth
            }, 1000, function () {
                $('.main-header__slider ul li:first-child').appendTo('.main-header__slider ul');
                $('.main-header__slider ul').css('left', '');
            });
        };

        $('a.control_prev').click(function () {
            moveLeft();
        });

        $('a.control_next').click(function () {
            moveRight();
        });
    });
    
})();



 /*---------------------------------------------------------------

                         NAVBAR

  ----------------------------------------------------------------*/
 (function() {

     var btn = document.querySelector('.main-nav__toggle');


     btn.addEventListener("click", function() {

         document.querySelector('.main-nav__navbar').classList.toggle('opened');

     });

     $( '.dropdown' ).hover(
         function(){
             $(this).children('.sub-menu').slideDown(200, function () {
                 if ($( this ).css( 'display') === 'none' ) {
                     $(this).removeAttr('style');
                 }
             });
         },
         function(){
             $(this).children('.sub-menu').slideUp(200, function () {
                 if ($( this ).css( 'display') === 'none' ) {
                     $(this).removeAttr('style');
                 }
             });
         }
     );
     
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
      return false;
      e.preventDefault(); //Prevent Default action. 
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
      return false;
      e.preventDefault(); //Prevent Default action. 
  }); 
  /*----------------------- eof callback form -----------------------------*/

})();

