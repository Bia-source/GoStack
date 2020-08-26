const express = require('express');

const app = express();



app.listen(3333, ()=>{
    app.get('/project', (request, response) => {
        return response.json({status: 200, tipo: 'get', feito: 'Ferreirinha'});
    });
});