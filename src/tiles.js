const test_tile = [
    0, 0, 2, 2, 2, 2, 0, 0, 
    0, 2, 2,12,12, 2, 0, 0, 
    2, 2,12,12,12, 2, 2, 2, 
    2, 2,12,12, 2,12,12, 2, 
    2, 2,12,12,11,12,12, 2,  
    2, 2,12,12,12,12, 2, 2, 
    2, 2, 2,12,12,12, 2, 0, 
    0, 0, 2, 2, 2, 2, 0, 0 
];

const guy_tile = [
    0, 2, 2, 2, 2, 2, 2, 0,
    2,13,13,13, 1, 2,13, 2, 
    2,13,13,13,13,13,13, 2, 
    0, 2, 2, 2, 2, 2, 2, 0,
    2,15,15,15,15,15,15, 2, 
    2, 8, 8, 8, 8, 8, 8, 2, 
    0, 2, 8, 8, 8, 8, 2, 0, 
    0, 2, 2, 2, 0, 2, 2, 2
];

const guy_tile_walk = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 2, 2, 2, 2, 2, 2, 0,
    2,13,13,13, 1, 2,13, 2, 
    2,13,13,13,13,13,13, 2, 
    0, 2, 2, 2, 2, 2, 2, 0,
    2,15,15,15,15,15,15, 2, 
    0, 2, 8, 8, 8, 8, 2, 0, 
    0, 0, 2, 2, 2, 2, 0, 0
];

const grid_tile = new Uint8Array([
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0,
]);

// grass
const grass_tile = [
    11,11, 7, 7, 4, 4,11,11, 
    11,11, 7, 7, 4, 4,11,11, 
    4,11,11, 7, 7, 4, 4,11,
    4,11,11, 7, 7, 4, 4,11, 
    7, 7, 4, 4,11,11, 4, 4,
    7, 7, 4, 4,11,11, 4, 4, 
    4,11,11, 7, 7, 4, 4,11,
    4,11,11, 7, 7, 4, 4,11, 
]; 

const sky_tile = new Uint8Array([
    15,15,15,15,15,15,15,15,
    15,15,15,15,15,15,15,15,
    15,15,15,15,15,15,15,15,
    15,15,15,15,15,15,15,15,
    15,15,15,15,15,15,15,15,
    15,15,15,15,15,15,15,15,
    15,15,15,15,15,15,15,15,
    15,15,15,15,15,15,15,15
]);

const bg_tiles = [
    // empty
    [
         0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0
    ],

    // sky
    [
        15,15,15,15,15,15,15,15,
        15,15,15,15,15,15,15,15,
        15,15,15,15,15,15,15,15,
        15,15,15,15,15,15,15,15,
        15,15,15,15,15,15,15,15,
        15,15,15,15,15,15,15,15,
        15,15,15,15,15,15,15,15,
        15,15,15,15,15,15,15,15
    ], 

    // grass
    [
       11,11, 7, 7, 4, 4,11,11, 
       11,11, 7, 7, 4, 4,11,11, 
        4,11,11, 7, 7, 4, 4,11,
        4,11,11, 7, 7, 4, 4,11, 
        7, 7, 4, 4,11,11, 4, 4,
        7, 7, 4, 4,11,11, 4, 4, 
        4,11,11, 7, 7, 4, 4,11,
        4,11,11, 7, 7, 4, 4,11, 
    ],

    // dirt
    [
        17,17,17,17,17,17,17,17,
        17,17,17,17,17,17,17,17, 
        17,17,17,17,17,17,17,17,
        17,17,17,17,17,17,17,17, 
        17,17,17,17,17,17,17,17,
        17,17,17,17,17,17,17,17, 
        17,17,17,17,17,17,17,17,
        17,17,17,17,17,17,17,17
    ]

];



