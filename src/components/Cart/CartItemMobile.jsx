import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';
import ItemCount from "../Items/ItemCount";
import { useState, useContext } from "react";
import { MyContext } from "../../context/CartContext";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";

const CartItemMobile = ({ product }) => {
    const { title, pictureUrl, price, stock } = product;
    const [countItem, setCountItem] = useState(product.quantity);
    const { onRemove, addQuantity, removeQuantity } = useContext(MyContext);

    const handleAddItem = () => {
        setCountItem(countItem + 1);
        addQuantity(product.id);
    };

    function handleRemoveItem() {
        if (countItem > 0) {
            setCountItem(countItem - 1);
            removeQuantity(product.id);
        }
    }

    return (
        <Grid item xs={12} sm={6} sx={{ display: { sm: "block", md: "none" } }}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt={title}
                    height="240"
                    image={pictureUrl}
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                        {`${countItem} x ${title}`}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mt: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {`${countItem} x $${price} - $${countItem * price}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <>
                        <ItemCount
                            stock={stock}
                            initial={countItem}
                            addItem={handleAddItem}
                            removeItem={handleRemoveItem}
                        />
                        <IconButton color="error" aria-label="delete" onClick={() => onRemove(product.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default CartItemMobile;
