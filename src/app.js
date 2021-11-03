// Get the canvas and context so we can start drawing.
var c = document.getElementById("c");
var ctx = c.getContext('2d');

// Set up the fake screen, 30x18 tiles at 8x8px per tile
const FAKESCREEN = {width:240, height:144};
const TILESIZE = 8;
c.width = FAKESCREEN.width;
c.height = FAKESCREEN.height;

// Pre-render the background tiles and save them in this array.
// Calling fillRect for each pixel on the background is not performant.
let tiles = [];

// Pre-render our font tiles and store them here.
let font = [];

// Create our level geometry, the parts of the level we can collide with.
let geo = []; 

// Store which screen we're currently displaying
let board;

// Create an offscreen canvas to draw to.
// When the frame is finished we'll draw it to the onscreen canvas all at once.
var o_canvas = document.createElement('canvas');
o_canvas.width = FAKESCREEN.width;
o_canvas.height = FAKESCREEN.height;
var o_ctx = o_canvas.getContext('2d');

// Set some testing variables.
var player2 = {x:0,y:0,sprite:guy_tile,flip:false,
    lastx:0,lasty:0, // position last frame
    w:8, h:8,
    posx:0, posy:0, // position, in pixels
    speedx:0, speedy:0, // speed, in subpixels
    subx:0, suby:0,
    maxspeed:8, // also in subpixels
    onground:false, canjump:false,
    update: function () {

            // Platformer controls
            if (controls.isDown(controls.KEY_A)) {
                player2.speedx -= 2;
            }
            if (controls.isDown(controls.KEY_D)) {
                player2.speedx += 2;
            }

            if (player2.onground && player2.canjump && controls.isDown(controls.KEY_SPACE) ) {
                player2.speedy = -32;
                player2.canjump = false;
            } else if (player2.onground && !controls.isDown(controls.KEY_SPACE) ) {
                player2.canjump = true;
            }

            // Impose gravity
            player2.speedy++;

            // Impose friction
            if(this.onground) {
                if (this.speedx > 0) {this.speedx--;}
                else if (this.speedx < 0) {this.speedx++;}
            }

            // Move player
            moveCharacter(player2);
            
            // Check if the player collided with any soild tiles. 
            player2.onground = false;
            for (var i=0; i<geo.length; i++) {
                checkBoxCollision(player2,geo[i]);
            }

            // switch the walking sprite every 8 frames
            if ( (Math.floor(frame_count / 8) % 2 == 0) || 
                ( !controls.isDown(controls.KEY_A) && !controls.isDown(controls.KEY_D) ) ) {
                player2.sprite = guy_tile;
            } else {
                player2.sprite = guy_tile_walk;
            }

            // Switch the direction the player is facing depending on the direction button pressed. 
            if (controls.isDown(controls.KEY_A)) {player2.flip=true;}
            if (controls.isDown(controls.KEY_D)) {player2.flip=false;}
        }
};
var frame_count = 0; 

// Create some debugging flags
var colortest = false;
var fonttest = false;
var showcollision = false;
var showgrid = false;

function onResize() {
    // Stretch the canvas to fill the entire window.
    // Scaling options are defined in style.css.
    // WARNING: this scaling method breaks when adding <!DOCTYPE HTML> to the index.html file!
    // (Perhaps find a more standards-compliant way to do it?)
    c.style.width = window.innerWidth;
    c.style.height = window.innerHeight;
}

function preRenderTiles(rawTiles,renderedTiles) {
    // For each tile in the array...
    for (let k=0; k<rawTiles.length; k++) {

        // Create a canvas on which to pre-render tiles,
        let t = document.createElement('canvas');
        t.height = t.width = TILESIZE;
        let tctx = t.getContext('2d');

        // Render the tile,
        for (let i=0; i<(TILESIZE**2); i++) {

            if (rawTiles[k][i] != 0) {
                tctx.fillStyle = FAKEPALETTE[rawTiles[k][i]];
                tctx.fillRect((i%TILESIZE), Math.floor(i/TILESIZE), 1, 1);
            }
        }

        // Save the rendered tile.
        renderedTiles.push(t);
    }
}

function buildCollision(colData) {
    // clear the collision geometry array 
    geo.length = 0;

    // build the collision data and save it
    for (let i=0; i<colData.length; i++) {
        if (colData[i] != 0) {
            let b = {x:(i%30)*8,y:(Math.floor(i/30)*8),h:TILESIZE,w:TILESIZE};
            geo.push(b);
        }
    }
} 

function init() {
    preRenderTiles(bg_tiles,tiles);
    preRenderTiles(font_tiles,font);
    buildCollision(level1.collision);
    onResize();
    window.addEventListener('resize', onResize );
    board = level1;
    player2.x = 50; player2.y = 100;
}

// drawTile() is for rendering sprites. 
// Background tiles are pre-rendered in init() then drawn by render()
function drawTile(tile, where, flipped) {
    for (let i=0; i<(8*8); i++) {
        if (tile[i] != 0) {
            o_ctx.fillStyle = FAKEPALETTE[tile[i]];
            if (flipped) {
                o_ctx.fillRect(where.x+(8-(i%8)), where.y+Math.floor(i/8), 1, 1);
            } else {
                o_ctx.fillRect(where.x+(i%8), where.y+Math.floor(i/8), 1, 1);
            }
        }
    }
}

// drawMetaTile() draws sprites comprised of multiple tiles
function drawMetaTile(tiles, where, flipped=false) {
    // how many blocks till will this metatile be? favor height over width
    var mw = Math.floor(Math.sqrt(tiles.length));
    var mh = Math.floor(tiles.length/mw);

    for (var i=0; i<tiles.length; i++) {
        if (flipped) {
            drawTile(tiles[i], {x:where.x+(((mw-1)*8)-(Math.floor(i/mh)*8)), y:where.y+((i%mh)*8) }, flipped);
        } else {
            drawTile(tiles[i], {x:where.x+(Math.floor(i/mh)*8), y:where.y+((i%mh)*8) }, flipped);
        }
    }
}

function drawString(text, where) {
    for (let i=0; i<text.length; i++) {
        if (font_map.has(text[i]) ) {
            o_ctx.drawImage(font[font_map.get(text[i])], where.x+(i*8), where.y);
        }
    }
}

function render() {
    // Maybe we should clear the canvas, but whatever.

    // Draw the pre-rendered background tiles to the screen.
    for (let i=0; i<(30*18); i++) {
        //o_ctx.drawImage(tiles[level1.tiles[i]], (i%30)*8, Math.floor(i/30)*8);
        o_ctx.drawImage(tiles[board.tiles[i]], (i%30)*8, Math.floor(i/30)*8);
    }

    // Draw the test sprite.
    drawTile(player2.sprite,player2,player2.flip);

    // Draw some test text strings. 
    drawString("POS   "+player2.x+" "+player2.y,{x:0,y:0});
    drawString("SUBPX "+player2.subx+" "+player2.suby,{x:0,y:8});
    drawString("SPEED "+player2.speedx+" "+player2.speedy,{x:0,y:16});
    drawString("ONGROUND "+ (player2.onground ? 1 : 0), {x:0,y:24} );

    // Show collision
    if (showcollision) {
        o_ctx.fillStyle = "#FF0000";
        for (let i=0; i<geo.length; i++) {
            o_ctx.fillRect(geo[i].x,geo[i].y,geo[i].w,geo[i].h);
        }
    }

    // Color palette test
    if (colortest) {
        for (i=0;i<FAKEPALETTE.length;i++) {
            o_ctx.fillStyle=FAKEPALETTE[i];
            o_ctx.fillRect(i*8,FAKESCREEN.height-8,8,8);
        }
    }

    // Font test
    if (fonttest) {
        for (let i=0; i<font_tiles.length; i++) {
            o_ctx.drawImage(font[i], (i%30)*8, Math.floor(i/30)*8);
        }
    }

    // Show grid
    if (showgrid) {
        for(let i=0; i<30; i++) {
            for (let j=0; j<18; j++) {
                drawTile(grid_tile, {x:i*8,y:j*8} );
            }
        }
    }

    // Draw from our offscreen canvas to the onscreen one.
    ctx.drawImage(o_canvas,0,0);
}

function update() {
    // Update frame count.
    frame_count++;
    
    player2.update();

    // if the sprite goes offscreen, wrap it to the other side and switch screens
    if (player2.x < 0) {
        player2.x = FAKESCREEN.width-TILESIZE;
        board = level1;
        buildCollision(level1.collision);
    } else if (player2.x+TILESIZE > FAKESCREEN.width) {
        player2.x = 0;
        board = level2;
        buildCollision(level2.collision);
    }

    // wrap to the top if the sprite falls off
    if (player2.y > FAKESCREEN.height) { player2.y = 0;}    
}

function run() {
    // TODO: Cap framerate to 60 for FireFox
    update();
    render();
    requestAnimationFrame(run);
}

init();
run();