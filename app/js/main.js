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

     // dropdownFirst.addEventListener("click", function(event) {
     //     event.preventDefault();
     //     event.stopPropagation();
     //     document.querySelector('.dropdown__chevron-down').classList.toggle('dropdown__chevron-down--opened');
     // });

     window.onclick = function(event) {
         if (!event.target.matches('.dropdown, .sub-menu')) {
             //document.querySelector('.dropdown__chevron-down').classList.remove('dropdown__chevron-down--opened');
             $('.sub-menu').each(function(){
                 $(this).slideUp(200);
             });
         }
     }

     var btn = document.querySelector('.main-nav__toggle');
     //
     // // $(".main-nav__toggle").click(function(){
     // //     $(".main-nav__navbar").slideToggle("slow", function () {
     // //         // if ($( this ).css( 'display') === 'block' ) {
     // //         //     $(this).removeAttr('style');
     // //         // }
     // //     });
     // // });
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

