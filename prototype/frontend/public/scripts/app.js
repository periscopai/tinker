'use strict';

// argument object - no longer bound to arrow functions

var add = function add(a, b) {
    console.log(arguments);
    return a + b;
};
console.log(add(23, 24));

// This keyword

var user = {
    name: "Laurent",
    cities: ['Geneva', 'Montreal', 'San Jose', 'barcelona'],

    print_places_lived: function print_places_lived() {
        var _this = this;

        var city_message = this.cities.map(function (city) {
            return city;
        });

        this.cities.forEach(function (city) {
            console.log(_this.name + " lived in " + city);
        });
    }
};

user.print_places_lived();
