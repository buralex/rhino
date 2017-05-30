'use strict';

//Observable
var ListBox = function (elements, chosenList, addButton, removeButton) {
    this.self = this;
    this.chosenList = chosenList;
    this.elements = elements;
    this.addButton = addButton;
    this.removeButton = removeButton;
    this.observers = [];
};

ListBox.prototype.sendMessage = function(msg) {  // send notification for observers
    for (var i = 0; i < this.observers.length; i++) {
        this.observers[i].notify(msg);
    }
};

ListBox.prototype.addObserver = function(observer) {
    this.observers.push(observer);
};

// ListBox.prototype.moveAllOptions = function(from, to) {
//
//     var elms = document.querySelectorAll('.' + from.className + ' li');
//
//     for (var i = 0; i < elms.length; i++) {
//
//         if (from === this.chosenList) {
//             elms[i].children[0].classList.remove('chosen');
//         } else {
//             elms[i].children[0].classList.add('chosen');
//         }
//
//         to.appendChild(elms[i]);
//         console.log('jsdalfkjasdljflksadjlfkjasdlkjfl');
//     }
// };

ListBox.prototype.sortItems = function(ul) {
    // var switching, elms, shouldSwitch;
    // switching = true;
    //
    // /*Make a loop that will continue until no switching has been done:*/
    // while (switching) {
    //     //start by saying: no switching is done:
    //     switching = false;
    //     //b = list.getElementsByTagName("LI");
    //
    //     elms = document.querySelectorAll('.' + ul.className + ' li');
    //
    //     //Loop through all list-items:
    //     for (var i = 0; i < (elms.length - 1); i++) {
    //
    //         //start by saying there should be no switching:
    //         shouldSwitch = false;
    //
    //         /*check if the next item should
    //          switch place with the current item:*/
    //         if (+elms[i].getAttribute('data-num') > +elms[i + 1].getAttribute('data-num')) {
    //             /*if next item is alphabetically
    //              lower than current item, mark as a switch
    //              and break the loop:*/
    //             shouldSwitch= true;
    //             break;
    //         }
    //     }
    //     if (shouldSwitch) {
    //         /*If a switch has been marked, make the switch
    //          and mark the switch as done:*/
    //         elms[i].parentNode.insertBefore(elms[i + 1], elms[i]);
    //         switching = true;
    //     }
    // }
};

// ListBox.prototype.init = function(offeredList, chosenList) {
//     var selfContext = this.self;
//
//
//     this.addButton.addEventListener("click", function (event) {
//         console.log(this.parentNode);
//
//         selfContext.moveAllOptions(offeredList, chosenList);
//         selfContext.sortItems(chosenList);
//         //console.log(this.parentNode);
//         //observable.sendMessage(this);
//     });
//
//     this.removeButton.addEventListener("click", function (event) {
//
//         console.log(this.self);
//         console.log(this.parentNode);
//
//         selfContext.moveAllOptions(chosenList, offeredList);
//         selfContext.sortItems(offeredList);
//         //console.log(this.parentNode);
//         //observable.sendMessage(this);
//     });
//
//     for (var i = 0; i < this.elements.length; i++) {
//         console.log('ff');
//         var el = optElms[i];
//         handler(el);
//
//     }
//
//     function handler(el) {
//         //console.log(selfContext);
//         //console.log(this.self);
//         el.addEventListener("click", function (event) {
//             //console.log(selfContext);
//             selfContext.sendMessage(this);
//             return;
//         });
//     }
// };

// ListBox.prototype.addAll = function() {
//     this.addButton.addEventListener("click", function (event) {
//         console.log(this.parentNode);
//
//         moveAllOptions(offeredList, chosenList);
//         sortSelect(chosenList);
//         //console.log(this.parentNode);
//         //observable.sendMessage(this);
//     });
// };



//Observer
var Observer = function(behaviour) {
    this.notify = function(msg) {
        behaviour(msg);
    }
};


// Initialization
var offeredElms = document.querySelectorAll('.offered li');
var chosenElms = document.querySelectorAll('.chosen li');
var offeredList = document.querySelector('.offered');
var chosenList = document.querySelector('.chosen');
var optElms = document.querySelectorAll('.options__form li');
var addAll = document.querySelector('#addAll');
var removeAll = document.querySelector('#removeAll');

var listbox = new ListBox(optElms, chosenList, addAll, removeAll);
    //listbox.init(offeredList, chosenList);

var listObserver = new Observer(function(msg){
    //console.log(msg.parentNode.className);
    //console.log();


    if (msg.parentNode === chosenList) {  // if we press on chosen list

        msg.children[0].classList.remove('chosen');
        offeredList.appendChild(msg);
        listbox.sortItems(offeredList);
        //return;
        //sortSelect(offeredList);
        //msg.parentNode.removeChild(msg);

    } else {
        console.log(msg.children[0]);
        msg.children[0].classList.add('chosen');
        chosenList.appendChild(msg);
        listbox.sortItems(chosenList);
        //return;
    }
});

// adding listener
listbox.addObserver(listObserver);

for (var i = 0; i < optElms.length; i++) {
    var el = optElms[i];
    handler(el);
}

function handler(el) {
    el.addEventListener("click", function (event) {
        listbox.sendMessage(this);
    });
}

// function sortSelect(ul) {
//
//     var switching, elms, shouldSwitch;
//
//     switching = true;
//
//     /*Make a loop that will continue until
//      no switching has been done:*/
//     while (switching) {
//         //start by saying: no switching is done:
//         switching = false;
//         //b = list.getElementsByTagName("LI");
//
//         elms = document.querySelectorAll('.' + ul.className + ' li');
//
//         //Loop through all list-items:
//         for (var i = 0; i < (elms.length - 1); i++) {
//
//             //start by saying there should be no switching:
//             shouldSwitch = false;
//
//             /*check if the next item should
//              switch place with the current item:*/
//             if (+elms[i].getAttribute('data-num') > +elms[i + 1].getAttribute('data-num')) {
//                 /*if next item is alphabetically
//                  lower than current item, mark as a switch
//                  and break the loop:*/
//                 shouldSwitch= true;
//                 break;
//             }
//         }
//         if (shouldSwitch) {
//             /*If a switch has been marked, make the switch
//              and mark the switch as done:*/
//             elms[i].parentNode.insertBefore(elms[i + 1], elms[i]);
//             switching = true;
//         }
//     }
// }
//
// var offeredElms = document.querySelectorAll('.offered li');
// var chosenElms = document.querySelectorAll('.chosen li');
// var offeredList = document.querySelector('.offered');
// var chosenList = document.querySelector('.chosen');
// var optElms = document.querySelectorAll('.options__form li');
//
//

//
//
//
// for (var i = 0; i < optElms.length; i++) {
//     var el = optElms[i];
//     handler(el);
//     //console.log('work');
// }
//
//
//
// var Observable = function() {
//     var observers = [];
//     this.sendMessage = function(msg) {
//         for (var i = 0; i < observers.length; i++) {
//             observers[i].notify(msg);
//         }
//     };
//     this.addObserver = function(observer) {
//         observers.push(observer);
//     };
// };
//
// var Observer = function(behaviour) {
//     //this._self = this;
//     this.notify = function(msg) {
//         behaviour(msg);
//     }
// };
//
// var observable = new Observable();
//
//
// var chosenListObs = new Observer(function(msg){
//     //console.log(msg.parentNode.className);
//     //console.log();
//
//
//     if (msg.parentNode.className === 'chosen') {  // if we press on chosen list
//
//         msg.children[0].classList.remove('chosen');
//         offeredList.appendChild(msg);
//
//         sortSelect(offeredList);
//         //msg.parentNode.removeChild(msg);
//
//     } else {
//         //console.log(msg.parentNode.className);
//         //console.log(chosenList);
//         //var mark = document.querySelector(msg.tagName + ' span');
//         console.log(msg.children[0]);
//         //mark.classList.add('chosen');
//         msg.children[0].classList.add('chosen');
//         chosenList.appendChild(msg);
//         sortSelect(chosenList);
//         //msg.parentNode.removeChild(msg);
//     }
//
//     //console.log(chosenList);
// });
//
// observable.addObserver(chosenListObs);
//
//
// function handler(el) {
//     el.addEventListener("click", function (event) {
//         //console.log(this.parentNode);
//         //console.log(this.parentNode);
//         observable.sendMessage(this);
//     });
// }


// var addAll = document.querySelector('#addAll');
// var removeAll = document.querySelector('#removeAll');
//
var moveAllOptions = function(from, to) {

    var elms = document.querySelectorAll('.' + from.className + ' li');

    for (var i = 0; i < elms.length; i++) {

        if (from.className === 'chosen') {
            elms[i].children[0].classList.remove('chosen');
        } else {
            elms[i].children[0].classList.add('chosen');
        }

        to.appendChild(elms[i]);
        //console.log('aaaaaaa');
    }
};
//
addAll.addEventListener("click", function (event) {
    console.log(this.parentNode);

    moveAllOptions(offeredList, chosenList);
    listbox.sortItems(chosenList);
    //console.log(this.parentNode);
    //observable.sendMessage(this);
});
removeAll.addEventListener("click", function (event) {
    console.log(this.parentNode);

    moveAllOptions(chosenList, offeredList);
    listbox.sortItems(offeredList);
    //console.log(this.parentNode);
    //observable.sendMessage(this);
});