'use strict';

// -------------------------------------------------------------------
// sortSelect(select_object)
//   Pass this function a SELECT object and the options will be sorted
//   by their attribute (data-num) values
// -------------------------------------------------------------------
function sortSelect(ul) {

    var switching, elms, shouldSwitch;

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
}

var offeredElms = document.querySelectorAll('.offered li');
var chosenElms = document.querySelectorAll('.chosen li');
var offeredList = document.querySelector('.offered');
var chosenList = document.querySelector('.chosen');
var optElms = document.querySelectorAll('.options__form li');



// var moveOptions = function(from, to, el) {
//     console.log(from);
//     //console.log(el);
//     from.removeChild(el);
//
//     var elNew = document.createElement('li');
//     var node = document.createTextNode("This is new.");
//     elNew.appendChild(node);
//     to.appendChild(elNew);
//     //sortSelect(to);
// };



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
    };
    this.addObserver = function(observer) {
        observers.push(observer);
    };
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
};

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