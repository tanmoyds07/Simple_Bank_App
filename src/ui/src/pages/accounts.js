import { CallMade, CallReceived } from "@mui/icons-material";
import { Box, MenuItem, Select, Tab, Tabs, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { customerDataSelector } from "../reducers/bank-reducer";

const filterOptions = ["Last 30 Days", "Last 6 Months", "Last Year", "Historic Date"];

const AccountsPage = () => {
    const [accounts, setAccouns] = useState([]);
    const customerData = useSelector(customerDataSelector);
    const [selectedTab, setSelectedTab] = useState(0);
    const [filter, setFilter] = useState("Last 30 Days");
    const [customDate, setCustomDate] = useState("");

    useLayoutEffect(() => {
        setAccouns(customerData?.accounts)
    }, [customerData])

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const currentAccount = accounts[selectedTab];

    // Filter transactions based on selected filter
    const filterTransactions = () => {
        const today = dayjs();
        let fromDate;

        switch (filter) {
            case "Last 30 Days":
                fromDate = today.subtract(30, "day");
                break;
            case "Last 6 Months":
                fromDate = today.subtract(6, "month");
                break;
            case "Last Year":
                fromDate = today.subtract(1, "year");
                break;
            case "Historic Date":
                fromDate = dayjs(customDate);
                break;
            default:
                fromDate = today.subtract(30, "day");
        }

        return currentAccount.transactions.filter((tx) => dayjs(tx.time).isAfter(fromDate));
    };

    const columns = [
        { field: "id", headerName: "Transaction ID", flex: 1 },
        {
            field: "amount", headerName: "Amount (₹)", flex: 1,
            renderCell: (params) => {
                return <span>{new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 2
                }).format(params.value)}</span>
            }
        },
        { field: "time", headerName: "Date", flex: 1, 
            renderCell: (params) => {
                return <span>{new Date(params?.value).toISOString()}</span>
            }
         },
        {
            field: "type", headerName: "", flex: 1,
            renderCell: (params) => {
                return <Box textAlign="end">
                    {params.value === "Credit" ? (
                        <CallMade sx={{ color: "green", mr: 1 }} />
                    ) : (
                        <CallReceived sx={{ color: "red", mr: 1 }} />
                    )}
                </Box>
            }
        }
    ];

    return (
        accounts.length > 0 ?
            <Box sx={{ width: "100%", p: 2, paddingBottom: 0, marginLeft: "1rem", height: "100%" }}>

                <Tabs value={selectedTab} onChange={handleTabChange}>
                    <Tab label="Savings Account" />
                    <Tab label="Loan Account" />
                </Tabs>

                {/* Account Details */}
                <Box sx={{ mb: 3, p: 2, bgcolor: "#1e1e1e", borderRadius: 2, width: "94%" }}>
                    <Typography variant="h6">Account Type: {currentAccount.type}</Typography>
                    <Typography variant="body1">A/c No: {currentAccount.accNo}</Typography>

                    {currentAccount.type === "Savings" ? (
                        <Typography variant="body1">Balance: {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 2
                        }).format(currentAccount.balance)}</Typography>
                    ) : (
                        <Typography variant="body1">Outstanding Amount: {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 2
                        }).format(currentAccount.outstandingAmount)}</Typography>
                    )}
                </Box>

                {/* Transaction Filter */}
                <div style={{ width: "97%", textAlign: "end" }}>
                    <Box sx={{ alignItems: "center", gap: 2, mb: 2 }}>
                        <Select value={filter} onChange={handleFilterChange} sx={{ minWidth: 200, textAlign: "left", marginRight: "1rem" }}>
                            {filterOptions.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                        {filter === "Historic Date" && (
                            <TextField
                                type="date"
                                value={customDate}
                                onChange={(e) => setCustomDate(e.target.value)}
                                sx={{
                                    background: "linear-gradient(45deg, #ff9a9e, #fad0c4)", // Light gradient
                                    borderRadius: "5px",
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "transparent" }, // Hide default border
                                        "&:hover fieldset": { borderColor: "white" }, // Border on hover
                                        "&.Mui-focused fieldset": { borderColor: "white" }, // Border when focused
                                    },
                                    "& .MuiInputBase-input": {
                                        color: "black", // Ensure text is visible
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "black", // Label color
                                    },
                                    "& .MuiSvgIcon-root": {
                                        color: "black", // Calendar icon color
                                    },
                                    marginRight: "1rem"
                                }}
                            />

                        )}
                    </Box>
                </div>

                {/* Transactions Data Grid */}
                <DataGrid
                    rows={filterTransactions()}
                    columns={columns}
                    sx={{
                        height: "40vh",  // Ensures a fixed height
                        width: "96%",    // Prevents layout shifts
                        overflow: "auto", // Allows scrolling
                    }}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'time', sort: 'desc' }],
                        },
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10, 20, 50, 100]}
                />
            </Box> : <></>
    );
};

export default AccountsPage;
