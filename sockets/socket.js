// Mensajes de Sockets 

const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Iron maiden'));
bands.addBand(new Band(' A7x'));
bands.addBand(new Band('21 Pilots'));
bands.addBand(new Band(' SOAD'));


io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('bandas-activas', bands.getBands());

client.on('disconnect', () => console.log('cliente desconectado'));

client.on('mensaje',(payload) =>{
    console.log('mensaje',payload);
    io.emit('mensaje',{admin:'nuevo mensaje'});
});

client.on('emitir-mensaje', ( payload )=>{
console.log(payload);

client.broadcast.emit('nuevo-mensaje',payload);
          
})

client.on('vote-band',(payload) =>{
    console.log(payload);
    bands.voteBand(payload.id);
    io.emit('bandas-activas', bands.getBands());
})
client.on('add-band',(payload) =>{
    console.log(payload);
    const newBand = new Band(payload.name);
    bands.addBand(newBand);
    io.emit('bandas-activas', bands.getBands());
})
client.on('delete-band',(payload) =>{
    console.log(payload);
    bands.deleteBand(payload.id);
    io.emit('bandas-activas', bands.getBands());
})
});