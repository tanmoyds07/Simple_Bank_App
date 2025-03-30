const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3001;
const { getCustomerData, setCustomerData } = require('./data/customer-data');

// Middleware to parse JSON
app.use(express.json());

const cors = require("cors");
app.use(cors());

// Sample GET route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Node.js API!" });
});

app.post("/getCustomerDetails", (req, res) => {
    try {
        const { userName, password } = req.body;
        let customerData = getCustomerData();
        let foundCustomer = customerData.filter(p => p["userName"] === userName && p["password"] === password);
        if (foundCustomer.length > 0) {
            res.status(200).send({
                "data": foundCustomer[0]
            })
        }
        else {
            res.status(404).send({ "message": "Not found" })
        }
    } catch (e) {
        res.status(500).send({ "message": e })
    }
})

app.put("/payCreditCardBills", (req, res) => {
    try {
        const userId = req.body.userId
        const accountNo = req.body.accountNo
        const cardNo = req.body.cardNo
        const amountToBePaid = req.body.amount;

        let customerData = getCustomerData();

        let loggedInCustomerData = customerData.filter(p => p["userId"] === userId);
        if (loggedInCustomerData.length > 0) {
            let savingsAcc = loggedInCustomerData[0]["accounts"].filter(p => p["accNo"] === accountNo);
            if (savingsAcc.length > 0) {
                let accountData = savingsAcc[0];
                let creditCardData = loggedInCustomerData[0]["cards"].filter(p => p["cardNo"] === cardNo);
                if (creditCardData.length > 0) {
                    let cardDetails = creditCardData[0];
                    accountData["balance"] = accountData["balance"] - amountToBePaid;
                    accountData["transactions"].push({
                        "type": "Debiit",
                        "time": new Date(),
                        "amount": req.body.amount,
                        "id": `T${new Date().getTime()}`
                    })
                    cardDetails["remainingCredit"] = cardDetails["remainingCredit"] + amountToBePaid;
                    cardDetails["outstandingAmount"] = cardDetails["outstandingAmount"] - amountToBePaid;
                    let jsonData = {};
                    setCustomerData(customerData);
                    jsonData["allCustomersData"] = customerData;
                    fs.writeFile("data/customer-data.json", JSON.stringify(jsonData, null, 2), (err) => {
                        if (err) {
                            res.status(500).send({ "message": e })
                        }
                        res.status(200).send({ "message": "Bills paid successfully" })
                    });
                }
                else {
                    res.status(404).send({ "message": "No such card found" })
                }
            }
            else {
                res.status(404).send({ "message": "Account(s) not found" })
            }
        }
        else {
            res.status(404).send({ "message": "User not found" })
        }

    } catch (e) {
        res.status(500).send({ "message": e })
    }
})

// Sample POST route
app.post("/data", (req, res) => {
    const receivedData = req.body;
    res.json({ message: "Data received", data: receivedData });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
