export interface ProductType{
    discount?: number | undefined;
    inventory:number ;
    color: string[];
    size: string[];
  
    _id :string,
    productName : string,
    description?:string,
    price:number,
    category:string,
    image:{
        asset :{
            _ref : string;
            _image : "image";
        }
    },
    slug :{
        _type : "slug",
        current : string;
    }

}