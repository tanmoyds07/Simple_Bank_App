const fs = require("fs");

let data = JSON.parse(fs.readFileSync("data/customer-data.json", "utf8"))["allCustomersData"];

const setCustomerData = (newVal) => {
    data = newVal
}

const getCustomerData = () => data;

module.exports = { setCustomerData, getCustomerData };