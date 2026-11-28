import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: true,
    currentCity: null,
    currentState: null,
    currentAddress: null,
    shopInMyCity: null,
    itemsInMyCity: null,
    cartItems: [],
    totalAmount:0,
    myOrders:[]
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    setcurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setcurrentState: (state, action) => {
      state.currentState = action.payload;
    },
    setcurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setshopInMyCity: (state, action) => {
      state.shopInMyCity = action.payload;
    },
    setitemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addToCart: (state, action) => {
      const cartItem = action.payload;
      const exsistingItem = state.cartItems.find((i) => i.id == cartItem.id);
      if (exsistingItem) {
        exsistingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...cartItem,
          quantity: 1,
        });
        }
        state.totalAmount=state.cartItems.reduce((sum,i)=>sum+i.price*i.quantity,0)
      console.log(state.cartItems);
    },
    updateQuantity:(state,action)=>{
      const{id,quantity}=action.payload
      const item=state.cartItems.find(i=>i.id==id)
      if (!item) return;
      if(quantity <= 0){
        state.cartItems = state.cartItems.filter(i => i.id !== id);
      }
      else{
        item.quantity=quantity
      }
      state.totalAmount=state.cartItems.reduce((sum,i)=>sum+i.price*i.quantity,0)
    },
    removeCartItem:(state,action)=>{
      state.cartItems=state.cartItems.filter(i=>i.id!==action.payload)
      state.totalAmount=state.cartItems.reduce((sum,i)=>sum+i.price*i.quantity,0)
    },
    setMyOrders:(state,action)=>{
      state.myOrders=action.payload
    },
    addMyOrder:(state,action)=>{
      state.myOrders=[action.payload,...state.myOrders]
    },
    updateOrderStatus:(state,action)=>{
      const {orderId,shopId,status}=action.payload
      const order=state.myOrders.find(o=>o._id==orderId)
      if(order){
        if(order.shopOrders && order.shopOrders.shop._id==shopId){
          order.shopOrders.status=status
        }
      }
    }
  },
});

export const {
  setUserData,
  setcurrentCity,
  setcurrentState,
  setcurrentAddress,
  setshopInMyCity,
  setitemsInMyCity,
  setLoading,
  addToCart,
  updateQuantity,
  removeCartItem,
  setMyOrders,
  addMyOrder
} = userSlice.actions;
export default userSlice.reducer;
