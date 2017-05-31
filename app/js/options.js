'use strict';

/*
*   MVC
*/

/*----------------------------------------------------------------------------------
                                        VIEW
----------------------------------------------------------------------------------- */


var View = function(chosenList){
    this.chosenList = chosenList;
};

/*
 * Move all options into one list
 */
View.prototype.moveAllOptions = function(from, to) {

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
 * Move one option
 */
View.prototype.moveToChoose = function(el, offeredList, chosenList) {

    el.children[0].classList.add('chosen');
    chosenList.appendChild(el);
};

/*
 * Move one option
 */
View.prototype.removeFromChoose = function(el, offeredList, chosenList) {

    el.children[0].classList.remove('chosen');
    offeredList.appendChild(el);
};

/*----------------------------------------------------------------------------------
                                        MODEL
 ----------------------------------------------------------------------------------- */

var Model = function(elements, chosenList, addButton, removeButton) {

    this.self = this;
    this.chosenList = chosenList;
    this.elements = elements;
    this.addButton = addButton;
    this.removeButton = removeButton;
    this.observers = [];
};

/*
 * Sorting options
 */
Model.prototype.sortItems = function(ul) {
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


/*----------------------------------------------------------------------------------
                                    CONTROLLER
 ----------------------------------------------------------------------------------- */

var Controller = function (model, view) {
    this.self = this;
    this.model = model;
    this.view = view;
};

Controller.prototype.chooseHandle = function (el, offeredList, chosenList) {
    var self = this.self;

    el.addEventListener("click", function (event) {
        event.stopPropagation();
        if (this.parentNode === offeredList) {  // if we press on chosen list
            self.view.moveToChoose(this, offeredList, chosenList);
            self.model.sortItems(chosenList);
        } else {
            self.view.removeFromChoose(this, offeredList, chosenList)
            self.model.sortItems(offeredList);
        }
    });
};

Controller.prototype.defaultOpt = function ( nums, elms, offeredList, chosenList) {
    var self = this.self;

    for (var i = 0; i < elms.length; i++) {
        for (var k = 0; k < nums.length; k++) {

            if (+elms[i].getAttribute('data-num') === nums[k]) {
                self.view.moveToChoose(elms[i], offeredList, chosenList);
                self.model.sortItems(chosenList);
            }
        }
    }

};

Controller.prototype.addAllHandle = function (offeredList, chosenList) {
    var self = this.self;
    this.view.moveAllOptions(offeredList, chosenList);
    this.model.sortItems(chosenList);
};

Controller.prototype.removeAllHandle = function (chosenList, offeredList) {
    var self = this.self;

    this.view.moveAllOptions(chosenList, offeredList);
    this.model.sortItems(offeredList);

};


/*----------------------------------------------------------------------------------
                               INITIALIZATION
 ----------------------------------------------------------------------------------- */

(function() {

    var offeredElms = document.querySelectorAll('.offered li');
    var chosenElms = document.querySelectorAll('.chosen li');
    var offeredList = document.querySelector('.offered');
    var chosenList = document.querySelector('.chosen');
    var optElms = document.querySelectorAll('.options__form li');
    var addAllBtn = document.querySelector('#addAll');
    var removeAllBtn = document.querySelector('#removeAll');

    var model = new Model();
    var view = new View(chosenList);
    var controller = new Controller(model, view);

    /*
    *  Assigning default options
    */
    controller.defaultOpt( [4, 5, 7, 10], optElms, offeredList, chosenList);

    var app = {

        init: function () {
            this.main();
            this.chooseEvent(); // click on li element
            this.addOpt(); // add all options
            this.removeOpt();
        },

        main: function () {

        },

        chooseEvent: function () {
            for (var i = 0; i < optElms.length; i++) {
                var el = optElms[i];
                controller.chooseHandle(el, offeredList, chosenList);
            }
        },

        addOpt: function () {
            addAllBtn.addEventListener("click", function (event) {
                controller.addAllHandle(offeredList, chosenList);
            });
        },

        removeOpt: function () {
            removeAllBtn.addEventListener("click", function (event) {
                controller.removeAllHandle(chosenList, offeredList);
            });
        }

    };

    app.init();

}());
