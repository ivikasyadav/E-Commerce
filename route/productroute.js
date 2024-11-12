const mongoose=require("mongoose")
const express=require("express")
const router=express.Router()
const prosuctModel=require("../model/productModel")
const formidable=require("express-formidable")
const fs=require("fs")


    router.post("/createproduct",formidable(),async(req,res)=>{
        try{
            const {name,price,desc,quantity,category}=req.fields
            const {photo}= req.files
            const exproduct=await prosuctModel.findOne({name})
            if(exproduct){
                return res.send({
                    message:"product already exist"
                })
            }
            const product=new prosuctModel({name,price,desc,quantity,category})
            if (photo) {
                product.photo.data = fs.readFileSync(photo.path)
                product.photo.contentType=photo.type
            }
            await product.save()
            if(product){
                return res.send({
                    success:true,
                    message:"Prodct create",
                    product
                })
            }
        }catch(err){
            console.log(err,"error in create product")
        }
    })

router.put("/updateproduct/:id",formidable(),async(req,res)=>{
    try{
        const id=req.params.id
        const {name,price,desc,category,quantity}=req.fields
        const {photo}=req.files
       

        // const exproduct=await prosuctModel.findOne({name})
        // if(!exproduct){
        //     res.send({
        //         message:"product already exist"
        //     })
        // }
        // const searchproduct=await prosuctModel.findById(id)
       
        const updateproduct=await prosuctModel.findByIdAndUpdate(id,{name,price,desc,category,quantity})
        if(photo){
            updateproduct.photo.data=fs.readFileSync(photo.path)
            updateproduct.photo.contentType=photo.type

        }
        await updateproduct.save()
        if(!updateproduct){
            return res.send({
                message:"product not found"
            })
        }
        res.send({
            message:"product updated",
            updateproduct
        })
    }catch(err){
        console.log(err,"error in update product")
    }
})

router.delete("/deleteproduct/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const deleteproduct=await prosuctModel.findByIdAndDelete(id)
        if(!deleteproduct){
            return res.send({
                message:"product not found"
                })
        }
        res.send({
            success:true,
            message:"product deleted"
            })
    }catch(err){
        console.log(err,"error in delete product")
    }
})

router.get("/getallproduct",async(req,res)=>{
    try{
        const product=await prosuctModel.find({})
        if(!product){
            res.send({
                message:"product not found"
            })
        }
        res.send({
            message:"product forund",
            product
        })

    }catch(err){
        console.log(err)
    }
})

router.get("/singleproduct/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const product=await prosuctModel.findById(id)
        if(!product){
            res.send({
                message:"product not found"
            })
            }
        res.send({
            message:"product found",
            product
        
        })
    }catch(err){
        console.log(err)
    }
})


router.get("/selectedcategories/:categories", async (req, res) => {
    try {
        const { categories } = req.params;
        const categoryNames = categories.split(',');  // Split by comma if multiple categories

        // Fetch category IDs based on category names
        const categoryDocs = await Category.find({ name: { $in: categoryNames } });
        const categoryIds = categoryDocs.map(category => category._id);

        // Now find products with these category IDs
        const products = await prosuctModel.find({ category: { $in: categoryIds } });

        if (!products || products.length === 0) {
            return res.status(404).send({ message: "Products not found" });
        }

        res.status(200).send({
            message: "Products fetched successfully",
            products
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "An error occurred while fetching products", error: err.message });
    }
});

router.post("/product-filter", async (req, res) => {
    try {
        const { selectedCategories, radio } = req.body;
        const args = {};

        // Filter by categories
        if (selectedCategories && selectedCategories.length > 0) {
            args.category = { $in: selectedCategories };  // This applies the "AND" condition for the categories
        }

        // Filter by price
        if (radio && radio.length === 2) {
            args.price = { $gte: radio[0], $lte: radio[1] };
        }

        // Fetch products based on filters
        const products = await productModel.find(args);

        res.send({ success: true, products });
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: "Server error" });
    }
});

router.get("/search/:keyword",async(req,res)=>{
    try{
        const {keyword}=req.params

        const product=await prosuctModel.find({
            $or:[
                {name:{$regex:keyword,$options:"i"}},
                {desc:{$regex:keyword, $options:"i"}},
                
            ]
        })
        res.send({
            success: true,
            productCount: product.length,  // Renaming 'product' to 'productCount' for clarity
            products: product              // Renaming 'product' to 'products' for clarity
        });
        

    }catch(err){
        console.log(err)
    }
})

router.get("/categoryproduct/:id",async(req,res)=>{
    try{
        const {id}=req.params
        const product=await prosuctModel.find({category:id})
        if(!product){
            res.send({
                message:"Unsuccessfull",
                success:false,
            })
        }
        res.send({
            message:"successfull",
            product
        })

    }catch(err){

    }
})



module.exports=router
