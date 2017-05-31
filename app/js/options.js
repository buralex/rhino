'use strict';

/*----------------------------------------------------------------------------------
                                        VIEW
----------------------------------------------------------------------------------- */


var View = function(){
    //this.chosenList = chosenList;
    // this.show = function (n) {
    //
    //     console.log(n);
    //     // var el = document.getElementById("showResult");
    //     // el.innerHTML = n;
    // };
};


/*
 * Move all options into one list
 */
View.prototype.moveAllOptions = function(from, to) {
    console.log(to);
    var elms = document.querySelectorAll('.' + from.className + ' li');

    for (var i = 0; i < elms.length; i++) {

        if (from === this.chosenList) {
            elms[i].children[0].classList.remove('chosen');
        } else {
            elms[i].children[0].classList.add('chosen');
        }
        //console.log(elms +'gg');
        to.appendChild(elms[i]);
    }
};

/*
 * Move one option
 */
View.prototype.moveToChoose = function(el, offeredList, chosenList) {
    //console.log(chosenList);
        el.children[0].classList.add('chosen');
        chosenList.appendChild(el);

    // if (el.parentNode === chosenList) {  // if we press on chosen list
    //
    //     el.children[0].classList.remove('chosen');
    //     offeredList.appendChild(el);
    //     //listbox.sortItems(offeredList);
    //
    // } else {
    //     //console.log(el.children[0]);
    //     el.children[0].classList.add('chosen');
    //     chosenList.appendChild(el);
    //     //listbox.sortItems(chosenList);
    // }
};

/*
 * Move one option
 */
View.prototype.removeFromChoose = function(el, offeredList, chosenList) {
    console.log('77777777777777');

        el.children[0].classList.remove('chosen');
        offeredList.appendChild(el);

    // if (el.parentNode === chosenList) {  // if we press on chosen list
    //
    //     el.children[0].classList.remove('chosen');
    //     offeredList.appendChild(el);
    //     //listbox.sortItems(offeredList);
    //
    // } else {
    //     //console.log(el.children[0]);
    //     el.children[0].classList.add('chosen');
    //     chosenList.appendChild(el);
    //     //listbox.sortItems(chosenList);
    // }
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

    // this.handleClick = function (el) {
    //
    // };
};

Controller.prototype.chooseHandle = function (el, offeredList, chosenList) {
    var self = this.self;
    //console.log(this.self);
    //console.log(this);

    el.addEventListener("click", function (event) {
        event.stopPropagation();
        //selfContext.model.moveElem(this);
        console.log(this.parentNode);

        if (this.parentNode === offeredList) {  // if we press on chosen list
            self.view.moveToChoose(this, offeredList, chosenList);
            self.model.sortItems(chosenList);


            //el.children[0].classList.remove('chosen');
            //offeredList.appendChild(el);
            //listbox.sortItems(offeredList);

        } else {
            self.view.removeFromChoose(this, offeredList, chosenList)
            //console.log(self);
            self.model.sortItems(offeredList);
            //console.log(el.children[0]);
            //el.children[0].classList.add('chosen');
            //chosenList.appendChild(el);
            //listbox.sortItems(chosenList);
        }



        //self.view.moveOptn(this, offeredList, chosenList);
        //self.model.sortItems(chosenList);
    });
};

Controller.prototype.addAllHandle = function (offeredList, chosenList) {
    var self = this.self;
    //console.log(this.self);
    //console.log(this);

    // el.addEventListener("click", function (event) {
    //     event.stopPropagation();
        //selfContext.model.moveElem(this);
        this.view.moveAllOptions(offeredList, chosenList);
        this.model.sortItems(chosenList);
        //self.view.moveAllOptions(this);
    // });
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
    var view = new View();
    var controller = new Controller(model, view);

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
                //console.log(chosenList);
                controller.chooseHandle(el, offeredList, chosenList);
            }
            //var el = document.getElementById("calcUser");
            //el.onclick = controller.handleClick();
        },
        addOpt: function () {
            addAllBtn.addEventListener("click", function (event) {
                //console.log(this.parentNode);
                //var self = this.

                controller.addAllHandle(offeredList, chosenList);

                //self.moveAllOptions(offeredList, chosenList);
                //self.sortItems(chosenList);
            });
            //var el = document.getElementById("calcUser");
            //el.onclick = controller.handleClick();
        },
        removeOpt: function () {
            removeAllBtn.addEventListener("click", function (event) {

                controller.removeAllHandle(chosenList, offeredList);

            });
        }

    };

    app.init();

}());
