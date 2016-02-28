var defaults = {
    server: 'https://glimpseserver.herokuapp.com',
    port:'443',
    /** persistEvents: { "EventName" : ["Property", "Names", "To", "Persist"] } */
    persistEvents: {}
}

var Glimpse = function(id, glimpseCode, options) {
    this.options = defaults;
    this.glimpseCode = glimpseCode;
    this.id = id;
    if(options) {
        for(var key in options) {
            if(options.hasOwnProperty(key)) this.options[key] = options[key];
        }
    }
}

Glimpse.prototype.connect = function(callback) {
    var glimpseCode = this.glimpseCode;
    var id = this.id;
    var persistEvents = this.options.persistEvents;
    var socket = this.socket = require('./socket.js')(this.options.server + ':' + this.options.port);

    socket.on('connect', function(){
        socket.emit('glimpse:create', {
            id: id,
            impl: glimpseCode,
            persistEvents: persistEvents
        });
        
        if(callback) {
            callback(null, socket);
            callback = undefined;
        }
    });
    
    socket.on('disconnect', function(){
        
    });    
}

module.exports = Glimpse;