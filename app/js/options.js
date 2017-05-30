'use strict';


// -------------------------------------------------------------------
// hasOptions(obj)
//  Utility function to determine if a select object has an options array
// -------------------------------------------------------------------
// function hasOptions(obj) {
//     if (obj!=null && obj.options!=null) { return true; }
//     return false;
// }

// -------------------------------------------------------------------
// selectUnselectMatchingOptions(select_object,regex,select/unselect,true/false)
//  This is a general function used by the select functions below, to
//  avoid code duplication
// -------------------------------------------------------------------
// function selectUnselectMatchingOptions(obj,regex,which,only) {
//     if (window.RegExp) {
//         if (which == "select") {
//             var selected1=true;
//             var selected2=false;
//         }
//         else if (which == "unselect") {
//             var selected1=false;
//             var selected2=true;
//         }
//         else {
//             return;
//         }
//         var re = new RegExp(regex);
//         if (!hasOptions(obj)) { return; }
//         for (var i=0; i<obj.options.length; i++) {
//             if (re.test(obj.options[i].text)) {
//                 obj.options[i].selected = selected1;
//             }
//             else {
//                 if (only == true) {
//                     obj.options[i].selected = selected2;
//                 }
//             }
//         }
//     }
// }

// -------------------------------------------------------------------
// selectMatchingOptions(select_object,regex)
//  This function selects all options that match the regular expression
//  passed in. Currently-selected options will not be changed.
// -------------------------------------------------------------------
// function selectMatchingOptions(obj,regex) {
//     selectUnselectMatchingOptions(obj,regex,"select",false);
// }
// -------------------------------------------------------------------
// selectOnlyMatchingOptions(select_object,regex)
//  This function selects all options that match the regular expression
//  passed in. Selected options that don't match will be un-selected.
// -------------------------------------------------------------------
// function selectOnlyMatchingOptions(obj,regex) {
//     selectUnselectMatchingOptions(obj,regex,"select",true);
// }
// -------------------------------------------------------------------
// unSelectMatchingOptions(select_object,regex)
//  This function Unselects all options that match the regular expression
//  passed in.
// -------------------------------------------------------------------
// function unSelectMatchingOptions(obj,regex) {
//     selectUnselectMatchingOptions(obj,regex,"unselect",false);
// }

// -------------------------------------------------------------------
// sortSelect(select_object)
//   Pass this function a SELECT object and the options will be sorted
//   by their text (display) values
// -------------------------------------------------------------------
function sortSelect(ul) {
    // var o = [];
    // if (!hasOptions(SelList)) { return; }
    // for (var i=0; i<obj.options.length; i++) {
    //     o[o.length] = new Option( obj.options[i].text, obj.options[i].value, obj.options[i].defaultSelected, obj.options[i].selected) ;
    // }
    // if (o.length==0) { return; }
    // o = o.sort(
    //     function(a,b) {
    //         // if ((a.text+"") < (b.text+"")) { return -1; }
    //         // if ((a.text+"") > (b.text+"")) { return 1; }
    //         // return 0;
    //         return a - b
    //     }
    // );
    //
    // for (var i=0; i<o.length; i++) {
    //     obj.options[i] = new Option(o[i].text, o[i].value, o[i].defaultSelected, o[i].selected);
    // }

        //console.log(SelList);
        //console.log(ul.className);
        //console.log(ul);
        //console.log(SelList);


    var switching, elms, shouldSwitch;
    //list = document.getElementById("id01");
    switching = true;

    /*Make a loop that will continue until
     no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        //b = list.getElementsByTagName("LI");

        elms = document.querySelectorAll('.' + ul.className + ' li');

        //Loop through all list-items:
        for (var i = 0; i < (elms.length - 1); i++) {

            //start by saying there should be no switching:
            shouldSwitch = false;

            /*check if the next item should
             switch place with the current item:*/
            if (+elms[i].getAttribute('data-num') > +elms[i + 1].getAttribute('data-num')) {
                /*if next item is alphabetically
                 lower than current item, mark as a switch
                 and break the loop:*/
                shouldSwitch= true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
             and mark the switch as done:*/
            elms[i].parentNode.insertBefore(elms[i + 1], elms[i]);
            switching = true;
        }
    }


     /*
        var elms = document.querySelectorAll('.' + ul.className + ' li');

        //var dataNum = document.querySelector('.' + ul.className + ' li').getAttribute('data-num');

        var dataNum ='';
        var Text ='';

        for (var x = 0 ; x < elms.length; x++)
        {
            for (var y = x + 1; y < elms.length; y++)
            {
                //var dataNum = elms[x].getAttribute('data-num');
                //console.log(elms[x].getAttribute('data-num'));
                console.log(elms[x], elms[y]);
                if (+(elms[x].getAttribute('data-num')) > +(elms[y].getAttribute('data-num')))
                {
                    // Swap rows
                    console.log('f');


                    //dataNum = +(elms[x].getAttribute('data-num'));
                    elms[x].parentNode.insertBefore(elms[x+1], elms[x]);
                    // Text= elms[x].textContent;
                    // console.log(Text);
                    // elms[x].setAttribute('data-num', elms[y].getAttribute('data-num'));
                    // elms[x].textContent = elms[y].textContent;
                    //elms[y].setAttribute('data-num', dataNum);
                    // elms[y].textContent = Text;
                }
            }
        }
    */
}

// -------------------------------------------------------------------
// selectAllOptions(select_object)
//  This function takes a select box and selects all options (in a
//  multiple select object). This is used when passing values between
//  two select boxes. Select all options in the right box before
//  submitting the form so the values will be sent to the server.
// -------------------------------------------------------------------
function selectAllOptions(obj) {
    // if (!hasOptions(obj)) { return; }
    for (var i=0; i<obj.options.length; i++) {
        obj.options[i].selected = true;
    }
}

// -------------------------------------------------------------------
// moveSelectedOptions(select_object,select_object[,autosort(true/false)])
//  This function moves options between select boxes. Works best with
//  multi-select boxes to create the common Windows control effect.
//  Passes all selected values from the first object to the second
//  object and re-sorts each box.
//  If a third argument of 'false' is passed, then the lists are not
//  sorted after the move.

//  You can also put this into the <SELECT> object as follows:
//    onDblClick="moveSelectedOptions(this,this.form.target)
//  This way, when the user double-clicks on a value in one box, it
//  will be transferred to the other (in browsers that support the
//  onDblClick() event handler).
// -------------------------------------------------------------------
function moveSelectedOptions(from,to) {
    // // Unselect matching options, if required
    // if (arguments.length>3) {
    //     var regex = arguments[3];
    //     if (regex != "") {
    //         unSelectMatchingOptions(from,regex);
    //     }
    // }
    // Move them over
    // if (!hasOptions(from)) { return; }

    var fromElms = document.querySelectorAll(from +' li'); // elements from offered list

    for (var i = 0; i < fromElms.length; i++) {

        var o = fromElms[i];

        to.appendChild(o);

        // if (o.selected) {
        //     if (!hasOptions(to)) { var index = 0; } else { var index=to.options.length; }
        //     to.options[index] = new Option( o.text, o.value, false, false);
        // }
    }
    // Delete them from original
    for (var i=(from.options.length-1); i>=0; i--) {
        var o = from.options[i];
        if (o.selected) {
            from.options[i] = null;
        }
    }
    if ((arguments.length<3) || (arguments[2]==true)) {
        sortSelect(from);
        sortSelect(to);
    }
    from.selectedIndex = -1;
    to.selectedIndex = -1;
}

// -------------------------------------------------------------------
// copySelectedOptions(select_object,select_object[,autosort(true/false)])
//  This function copies options between select boxes instead of
//  moving items. Duplicates in the target list are not allowed.
// -------------------------------------------------------------------
// function copySelectedOptions(from,to) {
//     var options = new Object();
//     if (hasOptions(to)) {
//         for (var i=0; i<to.options.length; i++) {
//             options[to.options[i].value] = to.options[i].text;
//         }
//     }
//     if (!hasOptions(from)) { return; }
//     for (var i=0; i<from.options.length; i++) {
//         var o = from.options[i];
//         if (o.selected) {
//             if (options[o.value] == null || options[o.value] == "undefined" || options[o.value]!=o.text) {
//                 if (!hasOptions(to)) { var index = 0; } else { var index=to.options.length; }
//                 to.options[index] = new Option( o.text, o.value, false, false);
//             }
//         }
//     }
//     if ((arguments.length<3) || (arguments[2]==true)) {
//         sortSelect(to);
//     }
//     from.selectedIndex = -1;
//     to.selectedIndex = -1;
// }

// -------------------------------------------------------------------
// moveAllOptions(select_object,select_object[,autosort(true/false)])
//  Move all options from one select box to another.
// -------------------------------------------------------------------
// function moveAllOptions(from,to) {
//     selectAllOptions(from);
//     if (arguments.length==2) {
//         moveSelectedOptions(from,to);
//     }
//     else if (arguments.length==3) {
//         moveSelectedOptions(from,to,arguments[2]);
//     }
//     else if (arguments.length==4) {
//         moveSelectedOptions(from,to,arguments[2],arguments[3]);
//     }
// }

// -------------------------------------------------------------------
// copyAllOptions(select_object,select_object[,autosort(true/false)])
//  Copy all options from one select box to another, instead of
//  removing items. Duplicates in the target list are not allowed.
// -------------------------------------------------------------------
// function copyAllOptions(from,to) {
//     selectAllOptions(from);
//     if (arguments.length==2) {
//         copySelectedOptions(from,to);
//     }
//     else if (arguments.length==3) {
//         copySelectedOptions(from,to,arguments[2]);
//     }
// }

// -------------------------------------------------------------------
// swapOptions(select_object,option1,option2)
//  Swap positions of two options in a select list
// -------------------------------------------------------------------
// function swapOptions(obj,i,j) {
//     var o = obj.options;
//     var i_selected = o[i].selected;
//     var j_selected = o[j].selected;
//     var temp = new Option(o[i].text, o[i].value, o[i].defaultSelected, o[i].selected);
//     var temp2= new Option(o[j].text, o[j].value, o[j].defaultSelected, o[j].selected);
//     o[i] = temp2;
//     o[j] = temp;
//     o[i].selected = j_selected;
//     o[j].selected = i_selected;
// }

// -------------------------------------------------------------------
// moveOptionUp(select_object)
//  Move selected option in a select list up one
// -------------------------------------------------------------------
// function moveOptionUp(obj) {
//     if (!hasOptions(obj)) { return; }
//     for (var i=0; i<obj.options.length; i++) {
//         if (obj.options[i].selected) {
//             if (i != 0 && !obj.options[i-1].selected) {
//                 swapOptions(obj,i,i-1);
//                 obj.options[i-1].selected = true;
//             }
//         }
//     }
// }

// -------------------------------------------------------------------
// moveOptionDown(select_object)
//  Move selected option in a select list down one
// -------------------------------------------------------------------
// function moveOptionDown(obj) {
//     if (!hasOptions(obj)) { return; }
//     for (var i=obj.options.length-1; i>=0; i--) {
//         if (obj.options[i].selected) {
//             if (i != (obj.options.length-1) && ! obj.options[i+1].selected) {
//                 swapOptions(obj,i,i+1);
//                 obj.options[i+1].selected = true;
//             }
//         }
//     }
// }

// -------------------------------------------------------------------
// removeSelectedOptions(select_object)
//  Remove all selected options from a list
// -------------------------------------------------------------------

// function removeSelectedOptions(from) {
//     if (!hasOptions(from)) { return; }
//     if (from.type=="select-one") {
//         from.options[from.selectedIndex] = null;
//     }
//     else {
//         for (var i=(from.options.length-1); i>=0; i--) {
//             var o=from.options[i];
//             if (o.selected) {
//                 from.options[i] = null;
//             }
//         }
//     }
//     from.selectedIndex = -1;
// }

// -------------------------------------------------------------------
// removeAllOptions(select_object)
//  Remove all options from a list
// -------------------------------------------------------------------
// function removeAllOptions(from) {
//     if (!hasOptions(from)) { return; }
//     for (var i=(from.options.length-1); i>=0; i--) {
//         from.options[i] = null;
//     }
//     from.selectedIndex = -1;
// }

// -------------------------------------------------------------------
// addOption(select_object,display_text,value,selected)
//  Add an option to a list
// -------------------------------------------------------------------
// function addOption(obj,text,value,selected) {
//     if (obj!=null && obj.options!=null) {
//         obj.options[obj.options.length] = new Option(text, value, false, selected);
//     }
// }

var offeredElms = document.querySelectorAll('.offered li');
var chosenElms = document.querySelectorAll('.chosen li');
var offeredList = document.querySelector('.offered');
var chosenList = document.querySelector('.chosen');
var optElms = document.querySelectorAll('.options__form li');

/*
// var moveOptions = function(from, to) {
//
// }

(function () {
    for (var i = 0; i < offeredElms.length; i++) {
        var el = offeredElms[i];
        offeredHandler(el);
    }
})();




var moveOptions = function(from, to, el) {
    console.log(from);
    //console.log(el);
    from.removeChild(el);

    var elNew = document.createElement('li');
    var node = document.createTextNode("This is new.");
    elNew.appendChild(node);
    to.appendChild(elNew);
    //sortSelect(to);
}

function offeredHandler(el) {
    el.addEventListener("click", function (event) {
        //console.log(this);
        //console.log(this.parentNode);
        moveOptions(offeredList, chosenList, this);
        //this.parentNode.removeChild(this);

        // var offeredList = document.querySelector('.offered');
        // var chosenList = document.querySelector('.chosen');
        // moveSelectedOptions(offeredList, chosenList, true);


        (function () {
            var chosenElms = document.querySelectorAll('.chosen li');
            for (var i = 0; i < chosenElms.length; i++) {
                console.log(chosenElms.length);
                var el = chosenElms[i];
                chosenHandler(el);
            }
        })();

    });
}

function chosenHandler(el) {
    el.addEventListener("click", function (event) {
        console.log(this);
        //console.log(this.parentNode);

        moveOptions(chosenList, offeredList, this);
        //this.parentNode.removeChild(this);

        // var offeredList = document.querySelector('.offered');
        // var chosenList = document.querySelector('.chosen');
        // moveSelectedOptions(offeredList, chosenList, true);
    });
}

//console.log(optionLi);
*/

for (var i = 0; i < optElms.length; i++) {
    var el = optElms[i];
    handler(el);
    //console.log('work');
}



var Observable = function() {
    var observers = [];
    this.sendMessage = function(msg) {
        for (var i = 0; i < observers.length; i++) {
            observers[i].notify(msg);
        }
    }
    this.addObserver = function(observer) {
        observers.push(observer);
    }
};

var Observer = function(behaviour) {
    //this._self = this;
    this.notify = function(msg) {
        behaviour(msg);
    }
};

var observable = new Observable();


var chosenListObs = new Observer(function(msg){
    //console.log(msg.parentNode.className);
    //console.log();


    if (msg.parentNode.className === 'chosen') {  // if we press on chosen list

        msg.children[0].classList.remove('chosen');
        offeredList.appendChild(msg);

        sortSelect(offeredList);
        //msg.parentNode.removeChild(msg);

    } else {
        //console.log(msg.parentNode.className);
        //console.log(chosenList);
        //var mark = document.querySelector(msg.tagName + ' span');
        console.log(msg.children[0]);
        //mark.classList.add('chosen');
        msg.children[0].classList.add('chosen');
        chosenList.appendChild(msg);
        sortSelect(chosenList);
        //msg.parentNode.removeChild(msg);
    }

    //console.log(chosenList);
});

observable.addObserver(chosenListObs);


function handler(el) {
    el.addEventListener("click", function (event) {
        //console.log(this.parentNode);
        //console.log(this.parentNode);
        observable.sendMessage(this);
    });
}
var addAll = document.querySelector('#addAll');
var removeAll = document.querySelector('#removeAll');

var moveAllOptions = function(from, to) {

    var elms = document.querySelectorAll('.' + from.className + ' li');

    for (var i = 0; i < elms.length; i++) {

        if (from.className === 'chosen') {
            elms[i].children[0].classList.remove('chosen');
        } else {
            elms[i].children[0].classList.add('chosen');
        }

        to.appendChild(elms[i]);
    }
}

addAll.addEventListener("click", function (event) {
    console.log(this.parentNode);

    moveAllOptions(offeredList, chosenList);
    sortSelect(chosenList);
    //console.log(this.parentNode);
    //observable.sendMessage(this);
});
removeAll.addEventListener("click", function (event) {
    console.log(this.parentNode);

    moveAllOptions(chosenList, offeredList);
    sortSelect(offeredList);
    //console.log(this.parentNode);
    //observable.sendMessage(this);
});