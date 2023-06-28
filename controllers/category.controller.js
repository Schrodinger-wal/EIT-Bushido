const Category = require('../schemas/category.schema');


const addCategory = async (req,res) => {
    try {
        const category = new Category(req.body)
        await category.save()
        return res.status(200).send('Categoria agregada con mucho exito ;)');
        
    } catch (error) {
        return res.status(500).send('La categoria no se pudo guardar :U');
    }
    
}


const getCategorys = async (req,res) => {
    try {
        
        const categories = await Category.find()

        if(!categories){
            return res.status(404).send({
                msg:`No se encontraron las categorias :[`
            }) 
        }else{
        return   res.status(200).send({
            msg: 'Categorias obtenidas correctamente',
            categories: categories
        });
        }   
    } catch (error) {
        return res.status(500).send({
            msg: 'Error al Obtener las Categorias',
            });
    }    
}

const deleteCategory = async (req,res) => {
    try {
        const id = req.params.idProduct;
        const deleteProduct = await Product.findByIdAndDelete(id)
    
        if(!deleteProduct){
            return res.status(404).send({mgr:'no se encontro el producto a borrar'});
            }

        return res.status(200).send({
            msg: 'Producto borrado correctamente',
            deleteProduct
        })
    
    }catch(error) {
        return res.status(500).send({
            msg: 'Error al borrar el producto'
        });
    }
}



module.exports = {
    addCategory,
    getCategorys,
    deleteCategory
}