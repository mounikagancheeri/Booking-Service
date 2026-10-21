const categoryService=require('../services/category.service');

const getcategories=async(req,res)=>{
    const categories=await categoryService.getAllCategories();
    res.status(200).json({
        message:'Categories fetched successfully',
        data:categories
    })
}

module.exports={
    getcategories
}