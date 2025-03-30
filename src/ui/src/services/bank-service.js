import { putData, postData } from './service-base';

// Example API call
postData('/accounts')
    .then(data => console.log(data))
    .catch(error => console.error(error));

const getCustomerDetails = async (userName, password) => {
    return await postData("getCustomerDetails", { userName: userName, password: password });
}

const payCreditCardBills = async (userId, cardNo, amount, accountNo) => {
    return await putData("payCreditCardBills", { userId: userId, cardNo: cardNo, amount: amount, accountNo: accountNo });
}

const bankService = {
    getCustomerDetails,
    payCreditCardBills
}

export default bankService;
