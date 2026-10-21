const categoryRepository=require('../repositories/category.repository');

const getAllCategories=async()=>{
    const categories=categoryRepository.getAllCategories();
    return categories;
}

module.exports={
    getAllCategories
}