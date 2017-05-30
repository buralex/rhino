'use strict';

/*
* Observable
*/
var ListBox = function (elements, chosenList, addButton, removeButton) {
    this.self = this;
    this.chosenList = chosenList;
    this.elements = elements;
    this.addButton = addButton;
    this.removeButton = removeButton;
    this.observers = [];
};

/*
 * Notification observers
 */
ListBox.prototype.sendMessage = function(msg) {
    for (var i = 0; i < this.observers.length; i++) {
        this.observers[i].notify(msg);
    }
};

/*
 * Add observers
 */
ListBox.prototype.addObserver = function(observer) {
    this.observers.push(observer);
};

/*
 * Move all options into one list
 */
ListBox.prototype.moveAllOptions = function(from, to) {

    var elms = document.querySelectorAll('.' + from.className + ' li');

    for (var i = 0; i < elms.length; i++) {

        if (from === this.chosenList) {
            elms[i].children[0].classList.remove('chosen');
        } else {
            elms[i].children[0].classList.add('chosen');
        }

        to.appendChild(elms[i]);
    }
};

/*
 * Sorting options
 */
ListBox.prototype.sortItems = function(ul) {
    var switching, elms, shouldSwitch;
    switching = true;

    /*Make a loop that will continue until no switching has been done:*/
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
};

/*
 * Assigning event handlers
 */
ListBox.prototype.init = function(offeredList, chosenList) {
    var selfContext = this.self;

    this.addButton.addEventListener("click", function (event) {
        console.log(this.parentNode);

        selfContext.moveAllOptions(offeredList, chosenList);
        selfContext.sortItems(chosenList);
    });

    this.removeButton.addEventListener("click", function (event) {

        selfContext.moveAllOptions(chosenList, offeredList);
        selfContext.sortItems(offeredList);
    });

    for (var i = 0; i < this.elements.length; i++) {
        console.log('ff');
        var el = optElms[i];
        handler(el);
    }

    function handler(el) {
        el.addEventListener("click", function (event) {
            event.stopPropagation();
            selfContext.sendMessage(this);
        });
    }
};

/*
 * Observer
 */
var Observer = function(behaviour) {
    this.notify = function(msg) {
        behaviour(msg);
    }
};

/*
 * Initialization
 */
var offeredElms = document.querySelectorAll('.offered li');
var chosenElms = document.querySelectorAll('.chosen li');
var offeredList = document.querySelector('.offered');
var chosenList = document.querySelector('.chosen');
var optElms = document.querySelectorAll('.options__form li');
var addAll = document.querySelector('#addAll');
var removeAll = document.querySelector('#removeAll');

var listbox = new ListBox(optElms, chosenList, addAll, removeAll);
    listbox.init(offeredList, chosenList);

var listObserver = new Observer(function(msg){

    if (msg.parentNode === chosenList) {  // if we press on chosen list

        msg.children[0].classList.remove('chosen');
        offeredList.appendChild(msg);
        listbox.sortItems(offeredList);

    } else {
        console.log(msg.children[0]);
        msg.children[0].classList.add('chosen');
        chosenList.appendChild(msg);
        listbox.sortItems(chosenList);
    }
});

/*
 * adding listener
 */
listbox.addObserver(listObserver);
