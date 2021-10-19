const bcrypt = require('bcryptjs');

const ayuda = {};

ayuda.encryptPassword = async (contraseña) =>{
    const salt = await bcrypt.genSalt(10);
    bcrypt.hash(contraseña, salt);
    const hash = await bcrypt.hash(contraseña,salt);
    return hash;
};

ayuda.Comparacion = async (contraseña, tempcontraseña)=> {
    try {
        return await bcrypt.compare(contraseña, tempcontraseña);
    } catch (e) {
        console.log(e)
    }
};

module.exports = ayuda;