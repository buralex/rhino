'use strict';

/*----------------------------------------------------------------------------------
                                        VIEW
----------------------------------------------------------------------------------- */



// var view = function() {
//     this.showChosen
// }




var view = {

    show: function (n) {

        console.log(n);
        // var el = document.getElementById("showResult");
        // el.innerHTML = n;
    }

};

/*----------------------------------------------------------------------------------
                                        MODEL
 ----------------------------------------------------------------------------------- */




var model = function(elements, chosenList, addButton, removeButton) {

    this.self = this;
    this.chosenList = chosenList;
    this.elements = elements;
    this.addButton = addButton;
    this.removeButton = removeButton;
    this.observers = [];
};


/*----------------------------------------------------------------------------------
                                    CONTROLLER
 ----------------------------------------------------------------------------------- */

var controller = {

    handleClick: function (el) {
        el.addEventListener("click", function (event) {
            event.stopPropagation();
            model.moveElem(this);

            view.show(this);
        });
        //var result = model.calculate(3, 6);

    }

};



/*----------------------------------------------------------------------------------
                                            INITIALIZATION
 ----------------------------------------------------------------------------------- */

(function() {

    var app = {

        init: function () {
            this.main();
            this.event();
        },

        main: function () {

        },

        event: function () {
            var optElms = document.querySelectorAll('.options__form li');

            for (var i = 0; i < optElms.length; i++) {
                var el = optElms[i];
                controller.handleClick(el);
            }
            //var el = document.getElementById("calcUser");
            //el.onclick = controller.handleClick();
        }

    };

    app.init();

}());
