var controls = {
    
    _pressed: {},

    KEY_W: 87,
    KEY_A: 65,
    KEY_S: 83,
    KEY_D: 68,
    KEY_SPACE: 32,

    init: function() {
        this._pressed[this.KEY_W] = false;
        this._pressed[this.KEY_A] = false;
        this._pressed[this.KEY_S] = false;
        this._pressed[this.KEY_D] = false;
        this._pressed[this.KEY_SPACE] = false;
    },

    isDown: function(keyCode) { return this._pressed[keyCode]; }, 

    onKeyDown: function(event) { 
        //console.log(event.keyCode);
        this._pressed[event.keyCode] = true; 
    },

    onKeyUp: function(event) { this._pressed[event.keyCode] = false; },

};

window.addEventListener('keydown', function(event) {controls.onKeyDown(event);} );
window.addEventListener('keyup', function(event) {controls.onKeyUp(event);} );