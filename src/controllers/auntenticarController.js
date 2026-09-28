const iniciarSesion = async (req, res) =>{
    const {usuario, clave}= req.body
    //simular bd de un usuario registrado
    const userBd = {"usuario": "Daniel", "clave": "123"}
    try {
        const {usuario, clave} = req.body
        //comparar con userBD
        if(userBd.usuario !== usuario || userBd.clave !== clave){
            res.json({mensaje: "usuario o clave incorrecta"})
        }
        res.json({mensaje: "Usuario Bienvenido"})
    } catch (error) {
        res.json({Error: error})
    }
}

module.exports = iniciarSesion;