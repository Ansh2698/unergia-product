"use strict";
module.exports=function(Product,local,fs,async){
    return{
        SetRouting:function(router){
            router.get("/",this.homePage);
            router.get("/submit",this.GetSubmitpage);
            router.post("/submit",local.Upload.single("productImage"),this.SubmitProduct);
        },
        homePage:function(req,res){
            async.parallel([
                function(callback){
                    Product.find({},function(err,result){
                        callback(err,result);
                    })
                }
            ],function(err,results){
                var res1=results[0];
                res.render("home",{data:res1});
            })
        },
        GetSubmitpage:function(req,res){
            return res.render("submit");
        },
        SubmitProduct:function(req,res){
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            var finalImg = {
                contentType: req.file.mimetype,
                image:  Buffer.from(encode_image, 'base64')
            };
            var newProduct=new Product();
            newProduct.Name=req.body.Name;
            newProduct.Description=req.body.Description;
            newProduct.ProductImage.data=finalImg.image;
            newProduct.ProductImage.contentType=finalImg.contentType;
            newProduct.Price=req.body.Price;
            newProduct.save(function(err,msg){
                res.redirect("/");
            })
        }
    }
}