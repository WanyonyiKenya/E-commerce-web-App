import React from "react";
import { Box, Button, IconButton, Divider, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setCartOpen,
} from "../../state";

import { useNavigate } from "react-router-dom";

const Flexed = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0,0,0,0.4"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* Headers */}
          <Flexed mb="15px">
            <Typography variant="h3">Shopping Bag ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </Flexed>

          {/* cart lists */}
          <Box>
            {cart.map((item) => (
              <Box key={`${item.attributes.name}-${item.id}`}>
                <Flexed p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={item?.name}
                      width="123px"
                      height="164px"
                      src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    {/* item name and descrpt */}
                    <Flexed mb="5px">
                      <Typography fontWeight="bold">
                        {item.attributes.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </Flexed>
                    <Typography>{item.attributes.shortDescription}</Typography>

                    {/* item amount */}

                    <Flexed m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item.id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                                {/* item prices */}
                      <Typography>Ksh. {item.attributes.price}</Typography>

                    </Flexed>
                  </Box>
                </Flexed>
                <Divider />
              </Box>
            ))}
          </Box>
          {/* subtotal,price and checkout */}
          <Box m ='20px 0'>
            <Flexed m = '20px 0'>
                <Typography fontWeight = 'bold'>SUBTOTAL</Typography>
                <Typography fontWeight = 'bold'>Ksh. {totalPrice}</Typography>
            </Flexed>
            <Button
                sx = {{
                    backgroundColor: shades.primary[400],
                    color:'white',
                    borderRadius:0,
                    minWidth:'100%',
                    padding:'20px 40px',
                    m: '20px 0'
                }}
                onClick = { ()=> {
                    navigate('/checkout')
                    dispatch(setCartOpen({}))
                }}
            >CheckOut</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
