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