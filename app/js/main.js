 "use strict";


 /*------------------------------------------------------------------------------

                        MODALS

  ------------------------------------------------------------------------------*/
 (function() {
 // Get the button that opens the modal
 var btn = document.getElementById("modalBtn");

 // When the user clicks the button, open the modal
 btn.onclick = function() {
     document.querySelector('#personInfo').style.display = "block";
 }


 // Get the modals
 var modalDivs = document.querySelectorAll('.modal');

 for ( var i = 0; i < modalDivs.length; i++ ) {
     var mDiv = modalDivs[i];
     clickListener(mDiv);
 }

 function clickListener(mDiv) {

     mDiv.addEventListener( "click", function() {
         console.log(mDiv.className);
         // Get the <span> element that closes the modal
         var span = document.querySelector("." + mDiv.className + " .close");

         // When the user clicks on <span> (x), close the modal
         span.addEventListener("click", function(event) {
             mDiv.style.display = "none";
         });

         window.addEventListener("click", function(event) {
             if (event.target == mDiv) {
                 mDiv.style.display = "none";
             }
         });
     });
 }
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
     //var drp =document.querySelector('.dropdown');
     //var sbm =document.querySelector('.sub-menu');

     $('.dropdown').on('click', function(event) {
         event.preventDefault();
         event.stopPropagation();
         $(this).children('.sub-menu').slideToggle(200);
         $(this).siblings().children('.sub-menu').hide();
     });

     window.addEventListener("click", function(event) {
         if (event.target.className != 'dropdown' && event.target.className != 'sub-menu') {
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
  
})();

/*---------------------------------------------------------------

						SEND REQUEST
						
----------------------------------------------------------------*/

(function() {
  
  $(".send-contact").on('submit' , function(e) {

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
      //$('#contactModal').modal('show');
        //alert('ssss');
    },
    error: function(jqXHR, textStatus, errorThrown) {
       
    }          
  });
      e.preventDefault(); //Prevent Default action.
      return false;
  }); 
  
})();

