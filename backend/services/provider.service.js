const providerRepository=require('../repositories/provider.repository');

const getAllProviders = (categoryId) => {
  return providerRepository
    .getAllProviders(categoryId);
};

const getProviderById=async(id)=>{
    const provider=providerRepository.getProviderById(id);
    if(!provider){
        const error=new Error(`Provider ${id} not found`);
        error.statusCode=404;
        throw error;
    }
    return provider;
}

module.exports={
    getAllProviders,
    getProviderById
}
