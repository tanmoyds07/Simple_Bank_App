import { Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerDataSelector, getCustomerDetails, payCreditCardBiils, setCustomerData } from "../reducers/bank-reducer";


const CreditCards = () => {
    const [creditCardDetails, setCreditCardDetails] = useState(null);
    const customerData = useSelector(customerDataSelector);
    const [amountoBePaid, setAmountToBePaid] = useState("");
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        setCreditCardDetails({
            cardNo: customerData?.cards[0]?.cardNo,
            remainingCredit: customerData?.cards[0]?.remainingCredit,
            outstandingAmount: customerData?.cards[0]?.outstandingAmount
        })
    }, [customerData])

    const payCreditCardBillsClicked = async (amountIndicator) => {
        let amount = amountIndicator === "full" ? customerData?.cards[0]?.outstandingAmount : amountIndicator === "min" ? 5000.00 : amountIndicator;
        const data = await dispatch(payCreditCardBiils({ userId: customerData?.userId, cardNo: customerData?.cards[0]?.cardNo, amount: amount, accountNo: customerData?.accounts[0]?.accNo }));
        if (data.payload === "Bills paid successfully") {
            const refreshedCustomerData = await dispatch(getCustomerDetails({ "userName": customerData?.userName, "password": customerData?.password }));
            if (refreshedCustomerData !== null && refreshedCustomerData !== undefined) {
                dispatch(setCustomerData(refreshedCustomerData));
            }
            setAmountToBePaid("");
        }
    }

    const setAndCheckCustomAmt = (e) => {
        if(e?.target?.value <= creditCardDetails.outstandingAmount)
            setAmountToBePaid(parseFloat(e?.target?.value));
        else
        setAmountToBePaid("");
    }

    return (
        creditCardDetails !== null ?
            <Box sx={{ width: "100%", height: "100%", bgcolor: "#121212", color: "white", p: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Credit Cards
                </Typography>
                {/* Credit Card Info */}

                <Grid container spacing={2} sx={{ width: "96%", my: 2, m: 2 }}>

                    <Grid item xs={12} md={12} sx={{ flexGrow: 1 }}>
                        <Card sx={{ mb: 2, p: 2, bgcolor: "#1e1e1e" }}>
                            <CardContent>
                                <Typography variant="h6">Card Details</Typography>
                                <Typography variant="body1">Card No: {creditCardDetails.cardNo}</Typography>
                                <Typography variant="body1">Remaining Credit: ₹{creditCardDetails.remainingCredit}</Typography>
                                <Typography variant="body1">Outstanding Amount: ₹{creditCardDetails.outstandingAmount}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>


                {/* Payment Options */}
                <Grid container spacing={2} sx={{ width: "96%", my: 2, m: 2 }}>

                    {/* Pay Full Amount */}
                    {
                        creditCardDetails.outstandingAmount > 0 ?
                            <Grid item xs={12} md={4} sx={{ flexGrow: 1 }}>
                                <Card sx={{ p: 2, bgcolor: "#1e1e1e", height: "100%", display: "flex", flexDirection: "column" }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <CardContent>
                                            <Typography variant="h6">Pay Full Amount</Typography>
                                        </CardContent>
                                    </Box>
                                    <Button variant="contained" color="primary" fullWidth onClick={() => payCreditCardBillsClicked("full")}>
                                        Pay ₹{creditCardDetails.outstandingAmount}
                                    </Button>
                                </Card>
                            </Grid> : <></>
                    }
                    {
                        creditCardDetails.outstandingAmount >= 5000.00 ?
                            <Grid item xs={12} md={4} sx={{ flexGrow: 1 }}>
                                <Card sx={{ p: 2, bgcolor: "#1e1e1e", height: "100%", display: "flex", flexDirection: "column" }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <CardContent>
                                            <Typography variant="h6">Minimum Amount</Typography>
                                            <Typography variant="body1">₹5000</Typography>
                                        </CardContent>
                                    </Box>
                                    <Button variant="contained" color="primary" fullWidth onClick={() => payCreditCardBillsClicked("min")}>
                                        Pay ₹5000
                                    </Button>
                                </Card>
                            </Grid> : <></>
                    }
                    {/* Pay Minimum Amount */}


                    {/* Pay Custom Amount */}
                    {
                        creditCardDetails.outstandingAmount > 0 ?
                            <Grid item xs={12} md={4} sx={{ flexGrow: 1 }}>
                                <Card sx={{ p: 2, bgcolor: "#1e1e1e", height: "100%", display: "flex", flexDirection: "column" }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <CardContent>
                                            <Typography variant="h6">Pay Custom Amount</Typography>
                                            <TextField
                                                value={amountoBePaid}
                                                fullWidth
                                                variant="outlined"
                                                type="number"
                                                placeholder="Enter Amount"
                                                sx={{ input: { color: "white" }, my: 1 }}
                                                onChange={(e) => setAndCheckCustomAmt(e)}
                                            />
                                        </CardContent>
                                    </Box>
                                    <Button variant="contained" color="primary" fullWidth onClick={() => payCreditCardBillsClicked(amountoBePaid)}>
                                        Pay ₹{amountoBePaid || "-"}
                                    </Button>
                                </Card>
                            </Grid> : <></>
                    }


                </Grid>


            </Box> : <></>
    );
};

export default CreditCards;
