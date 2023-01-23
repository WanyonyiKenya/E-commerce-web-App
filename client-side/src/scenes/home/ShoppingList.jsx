import React, {useEffect, useState} from 'react'
import  {Box,Tab,Tabs, Typography, useMediaQuery} from '@mui/material'
import Item from '../../components/Item'
import { useDispatch, useSelector } from 'react-redux'
import { setItems } from '../../state'


const ShoppingList = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('all')
    const items = useSelector((state)=> state.cart.items)
    const isNonMobile = useMediaQuery ('(min-width:600px')
    console.log('items', items)

    const handleChange = (event,newValue) => {
      setValue(newValue)
    }

    async function getItems () {
      const response = await fetch (
        'http://localhost:1337/api/items?populate=image',
        {method:'GET'}
      )
      const Items = await response.json()
      dispatch(setItems(Items.data))
    }

    useEffect(()=>{
      getItems()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps


    const topRatedItems = items?.filter(
      (item) => item.attributes.category === 'topRated'
    )

    const bestSellersItems = items?.filter(
      (item) => item.attributes.category === 'bestSellers'
    )

    const newArrivalsItems = items?.filter(
      (item) => item.attributes.category === 'newArrivals'
    )
  return (
    <Box width = '80%' margin = '80px auto'>
      <Typography variant='h3'  textAlign='center'>
        Our Featured Products
      </Typography>
      <Tabs
      
        textColor = 'primary'
        indicatorColor='primary'
        value={value}
        onChange = {handleChange}
        centered
        TabIndicatorProps={{sx: {display : isNonMobile ? 'block' : 'none'}}}
        sx = {{
          m: '25px',
          '& .MuiTabs-flexContainer' : {
            flexWrap : 'wrap'
          }
        }}
      >
        <Tab label = 'ALL' value='all' />
        <Tab label = 'NEW ARRIVALS' value='bestSellers' />
        <Tab label = 'BEST SELLERS' value='newArrivals' />
        <Tab label = 'TOP RATED' value='topRated' />
      </Tabs>
      <Box
        margon= '0  auto'
        display = 'grid'
        gridTemplateColumns  = 'repeat(auto-fill,300px)'
        justifyContent = 'space-around'
        rowGap = '20px'
        columnGap = '1.33%'
      >
        { value  === 'all'  && items.map((item)=> (
          <Item item = {item} key = {`${item.name}-${item.id}`} />
        ))}

        { value  === 'newArrivals'  && newArrivalsItems.map((item)=> (
                  <Item item = {item} key = {`${item.name}-${item.id}`} />
        ))}

        { value  === 'bestSellers'  && bestSellersItems.map((item)=> (
                  <Item item = {item} key = {`${item.name}-${item.id}`} />
       ))}

        { value  === 'topRated'  && topRatedItems.map((item)=> (
          <Item item = {item} key = {`${item.name}-${item.id}`} />
        ))}
      </Box>
    </Box>
  )
}

export default ShoppingList