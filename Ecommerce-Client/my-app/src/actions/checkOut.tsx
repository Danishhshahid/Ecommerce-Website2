import { Cart } from "@/app/utils/type";
import { Customerinfo } from "../type/checkout";
import { client } from "@/sanity/lib/client";
// import { ProductType } from "../type/product";

const createCustomerInSanity =async (customerInfo:Customerinfo)=>
{
    try{
    const customerObject ={
        _type : "customer",
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        number: customerInfo.number,
        address: customerInfo.address,
        state : customerInfo.state,
        country : customerInfo.country,
    }

    const response = await client.create(customerObject);
    console.log("user created in sanity")
    return response;
}
catch(error){
    console.log("error created user in sanity")
    throw error
}


}
const createOrderInSanity =async (CartData:Cart[], customer_id:string)=>
{
    try{
    const orderObject ={
        _type:"order",
        customer:{
            _type:"reference",
            _ref:customer_id
        },
        item:CartData.map((item)=>({
            _type:"items",
            _id:item._id,
            product_image :item.img,
            product_name:item.ProductName,
            product_price:item.price,
            product_description:item.description,
            quantity :item.qty
        })),
        order_date :new Date().toISOString()
        
       
    }

    const response = await client.create(orderObject);
    console.log("order created in sanity")
    return response
}
catch(error){
    console.log("error created order in sanity")
    throw error
}


}


export default async function checkOut (CartData : Cart[], customerInformation:Customerinfo ){
   //create customer
   //create order
try{
    const customer = await  createCustomerInSanity(customerInformation)
    await createOrderInSanity(CartData, customer._id)
}
catch(error){
    console.log("error created order and customer in sanity")
    throw error

}
   
   
    return false

}