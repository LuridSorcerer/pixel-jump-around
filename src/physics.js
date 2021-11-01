function checkBoxCollision(sprite, block) {

    if (
        sprite.x < block.x  + block.w &&
        sprite.x + sprite.w > block.x && 
        sprite.y < block.y  + block.h &&
        sprite.y + sprite.h > block.y
    ) {
        // If player was above the block last frame, put him on top
        if (sprite.lasty + sprite.h <= block.y) {
            sprite.y = block.y - sprite.h;
            sprite.speedy = 0;
            sprite.onground = true;
        // If player was below the block last frame, put him under it.
        } else if (sprite.lasty >= block.y + block.h) {
            sprite.y = block.y + block.h;
            sprite.speedy = 0;
        // If player was left of the block last frame, keep him to the left.
        } else if (sprite.lastx + sprite.w <= block.x) {
            sprite.x = block.x - sprite.w
            sprite.speedx = 0;
        // If player was right of the block last frame, keep him to the right.
        } else if (sprite.lastx >= block.x + block.w) {
            sprite.x = block.x + block.w;
            sprite.speedx = 0;
        }
        

    } else {

    }

}

const MAX_SPEED_X = 16;
const MAX_SPEED_Y = 64;
const SUBPIXELS = 16;

function moveCharacter(character) {

    // is this a good place to constrain movement speed?
    if (character.speedx > MAX_SPEED_X) {character.speedx = MAX_SPEED_X; }
    else if (character.speedx < -MAX_SPEED_X) {character.speedx = -MAX_SPEED_X; }
    
    if (character.speedy > MAX_SPEED_Y) {character.speedy = MAX_SPEED_Y; }
    else if (character.speedy < -MAX_SPEED_Y) {character.speedy = -MAX_SPEED_Y; }

    // save previous frame position
    character.lastx = character.x;
    character.lasty = character.y;

    // apply movement speed to subpixels
    character.subx += character.speedx;
    character.suby += character.speedy;

    // apply subpixel offset to absolute position
    // be sure to perform the correct rounding
    character.x += (character.subx > 0 ? Math.floor(character.subx / SUBPIXELS) : Math.ceil(character.subx / SUBPIXELS) );
    character.y += (character.suby > 0 ? Math.floor(character.suby / SUBPIXELS) : Math.ceil(character.suby / SUBPIXELS) );

    // constrain subpixel values
    character.subx %= SUBPIXELS;
    character.suby %= SUBPIXELS;   
}