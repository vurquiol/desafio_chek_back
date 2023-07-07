const errorHandler = (err, req, res, next) =>{
    console.log('Errores en controller', err);

    res.status(500).json({
        status: 500,
        mensaje: err.message
    });

    res.status(404).json({
        status: 404,
        mensaje: err.message
    });
}

module.exports = errorHandler;