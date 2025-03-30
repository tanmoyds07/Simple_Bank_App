import { AccountBalance, AccountBalanceWallet, Bolt, Payment, PersonAdd, QrCodeScanner } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { customerDataSelector } from "../reducers/bank-reducer";

const Dashboard = () => {
    const [accountDetails, setAccountDetails] = useState(null);
    const customerData = useSelector(customerDataSelector);

    useLayoutEffect(() => {
        setAccountDetails({
            email: customerData?.email,
            name: customerData?.name,
            accountDetails: {
                type: customerData?.accounts[0]?.type,
                accNo: customerData?.accounts[0]?.accNo,
                balance: customerData?.accounts[0]?.balance,
            },
        })
    }, [customerData])

    return (
        accountDetails !== null ? <Box sx={{ width: "100%", height: "100%", bgcolor: "#121212", color: "white", p: 2, alignItems: "center" }}>

            {/* Profile & Account Section */}
            <Grid container spacing={2} sx={{ width: "100%" }}>

                {/* User Profile Card (Left Side) */}
                <Grid item xs={12} md={6} sx={{ flexGrow: 1 }}>
                    <Card sx={{
                        width: "90%",
                        borderRadius: 3,
                        boxShadow: 6,
                        padding: 1,
                        m: 1,
                        alignItems: "center",
                        bgcolor: "#1e1e1e",
                        height: "30vh"
                    }}>
                        <Avatar sx={{ width: 100, height: 100, bgcolor: "#1976D2", m: 2 }}>{accountDetails.name[0]}</Avatar>
                        <Box sx={{ paddingLeft: "1rem" }}>
                            <Typography variant="h6">{accountDetails.name}</Typography>
                            <Typography variant="body2">{accountDetails.email}</Typography>
                            <Typography variant="caption">A/c No: {accountDetails.accountDetails.accNo}</Typography>
                        </Box>
                    </Card>
                </Grid>

                {/* Account Summary (Right Side) */}
                <Grid item xs={12} md={6} sx={{ flexGrow: 1 }}>
                    <Card sx={{
                        width: "90%",
                        borderRadius: 3,
                        boxShadow: 6,
                        padding: 1,
                        m: 1,
                        alignItems: "center",
                        bgcolor: "#1e1e1e",
                        height: "30vh"
                    }}>
                        <CardContent>
                            <Typography variant="h6">Balance</Typography>
                            <Typography variant="h4" fontWeight="bold">
                                {new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    maximumFractionDigits: 2
                                }).format(accountDetails.accountDetails.balance)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>


            {/* Quick Actions */}
            <Grid container spacing={2} sx={{ width: "100%", my: 2, paddingRight: "3rem" }}>


                {[
                    { icon: <Payment />, label: "Bill Payments" },
                    { icon: <AccountBalanceWallet />, label: "Money Transfer" },
                    { icon: <PersonAdd />, label: "Add Payee" },
                    { icon: <QrCodeScanner />, label: "Scan & Pay" },
                    { icon: <Bolt />, label: "Recharge" },
                    { icon: <AccountBalance />, label: "UPI Payment" }
                ].map((item, index) => (
                    <Grid item xs={6} sm={4} md={2} key={index} sx={{ flexGrow: 1 }}>
                        <Paper sx={{ p: 2, m: 1, textAlign: "center", background: "#1e1e1e", borderRadius: 2, width: "90" }}>
                            {item.icon}
                            <Typography variant="body2">{item.label}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box> : <></>
    );
};

export default Dashboard;
