import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Tabs, Tab, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useParams, useNavigate } from "react-router-dom";
import Item from "../../components/Item";

const ItemDetail = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getItem = async () => {
    const response = await fetch(
      ` http://localhost:1337/api/items/${itemId}?populate=image`,
      { method: "GET" }
    );
    const item = await response.json();
    setItem(item.data);
  };
  const getRelatedItems = async () => {
    const response = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" }
    );
    const Items = await response.json();
    setRelatedItems(Items.data);
  };
  useEffect(() => {
    getItem();
    getRelatedItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* image section */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            style={{ objectFit: "contain" }}
          />
        </Box>
        {/* actions,description etc */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box
              onClick={() => navigate("/")}
              sx={{
                "&:hover": { cursor: "pointer" },
              }}
              color={shades.secondary[500]}
            >Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>
          <Box m="65px 0 25px 0 ">
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography>Ksh. {item?.attributes?.price}</Typography>
            <Typography sx={{ marginTop: "20px" }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>
          {/* item count and add to cart button */}
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              Add To Cart
            </Button>
          </Box>

          <Box>
            <Box m="20px 0 5px 0 " display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>Add to WishList</Typography>
            </Box>
            <Typography>
              CATEGORIES:
              {item?.attributes?.category
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* description and reviews section */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{item?.attributes?.longDescription}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>
      {/* related items */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20%"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {relatedItems
            .slice(0, 5)
            .filter((nitem) => nitem.id !== item?.id)
            .map((item, i) => (
              <Item key={`${item.name}-${item.id}`} item={item} />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetail;
