"use strict";

let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter');

exports.searchHouse = (sender) => {
    messenger.send({text: `OK, looking for houses for sale around you...`}, sender);
    salesforce.findProperties().then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchHouse_City = (sender, values) => {
    messenger.send({text: `OK, looking for houses in ${values[1]}`}, sender);
    salesforce.findProperties({city: values[1]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchHouse_Bedrooms_City_Range = (sender, values) => {
    messenger.send({text: `OK, looking for ${values[1]} bedrooms in ${values[2]} between ${values[3]} and ${values[4]}`}, sender);
    salesforce.findProperties({bedrooms: values[1], city: values[2]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchHouse_Bedrooms_City = (sender, values) => {
    messenger.send({text: `OK, looking for ${values[1]} bedroom houses in ${values[2]}`}, sender);
    salesforce.findProperties({bedrooms: values[1], city: values[2]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchHouse_Bedrooms = (sender, values) => {
    messenger.send({text: `OK, looking for ${values[1]} bedrooms`}, sender);
    salesforce.findProperties({bedrooms: values[1]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchHouse_Range = (sender, values) => {
    messenger.send({text: `OK, looking for houses between ${values[1]} and ${values[2]}`}, sender);
    salesforce.findProperties({priceMin: values[1], priceMax: values[2]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.priceChanges = (sender, values) => {
    messenger.send({text: `OK, looking for recent price changes...`}, sender);
    salesforce.findPriceChanges().then(priceChanges => {
        messenger.send(formatter.formatPriceChanges(priceChanges), sender);
    });
};

exports.hi = (sender) => {
    console.log("### sender");
    console.log(sender);
    messenger.getUserInfo(sender).then(response => {
        messenger.send({text: `Hello!`}, sender);
    });
};