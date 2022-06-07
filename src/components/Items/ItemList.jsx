import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Item from "./Item";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ItemList({ onAdd, onRemove }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);

    const handleErrorOpen = () => {
        setError(true);
    };

    const handleErrorClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setError(false);
    };

    useEffect(() => {
        fetch("https://mocki.io/v1/963f0a45-43f3-4249-be6f-da7d4edb9721")
            .then((response) => response.json())
            .then((result) => {
                setTimeout(() => {
                    setLoading(false);
                    setProducts(result);
                }, 1500);
            })
            .catch((error) => {
                setLoading(false);
                handleErrorOpen();
                console.log(error);
            });
    }, []);

    return (
        <>
            {loading && (
                <Box sx={{ mt: "55px", display: "flex" }}>
                    <CircularProgress color="info" />
                </Box>
            )}
            {error && (
                <Snackbar
                    open={error}
                    autoHideDuration={5000}
                    onClose={handleErrorClose}
                >
                    <Alert
                        onClose={handleErrorClose}
                        severity="error"
                        sx={{ width: "100%" }}
                    >
                        Sorry, something happened loading the products
                    </Alert>
                </Snackbar>
            )}
            {products &&
                products.map((product) => (
                    <Grid
                        item
                        sm={6}
                        md={4}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        key={product.id}
                    >
                        <Item product={product} onAdd={onAdd} onRemove={onRemove} />
                    </Grid>
                ))}
        </>
    );
}
