const Product= require('../models/product');
const shortid= require('shortid');
const slugify= require('slugify');
const Category= require('../models/category')

exports.createProduct= (req, res) => {
    const { 
        name, 
        slug, 
        price, 
        productDescription, 
        category, 
        quantity, 
        createdBy } = req.body;
    
  
    
    let productPictures=[];
    if(req.files.length > 0){
        productPictures= req.files.map(file => {
            return { img: file.filename }
        });
        console.log(productPictures)
    }

    const product= new Product({
        name,
        slug: slugify(name),
        price,
        productDescription,
        productPictures,
        category,
        quantity,
        createdBy: req.user._id

    });

    product.save((error, product) => {
        if(error){
            return res.status(400).json({
                error
            });
        }
        else{
            return res.status(201).json({
                product
            });
        }
    })
}

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({slug: slug})
    .select('_id')
    .exec((error, category) => {
        if(error){
            return res.status(400).json({
                error
            })
        }
        if(category){
            Product.find({category: category})
            .exec((error, products) => {
                if(error){
                    return res.status(400).json({
                        error
                    })
                }
                return res.status(200).json({
                    products,
                    productsByPrice:{
                        under5K: products.filter(prod => prod.price <= 5000),
                        under10K: products.filter(prod => prod.price > 5000 && prod.price <=10000),
                        under15K: products.filter(prod => prod.price > 10000 && prod.price <=15000),
                        under20K: products.filter(prod => prod.price > 15000 && prod.price <=20000),
                        under30K: products.filter(prod => prod.price > 20000 && prod.price <=30000)




                    }
                })
            })
        }
        
    })
}

exports.getProductDetailsById = (req, res) => {
    const { productId }= req.params;

    if(productId){
        Product.findOne({ _id: productId })
        .exec((error, product) => {
            if(error) return res.status(400).json({ error })
            if(product) return res.status(200).json({ product })
        })
    }
    else{
        return res.status(400).json({ error: 'Params required'})
    }

}
