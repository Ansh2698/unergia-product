"use strict";
module.exports=function(Product,local,fs,async){
    return{
        SetRouting:function(router){
            router.get("/",this.GetSubmitpage);
            router.post("/submit",local.Upload.single("productImage"),this.SubmitProduct);
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