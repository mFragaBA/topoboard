/*
    Implements an NxM torus board such as

    ......<-.......
    .             .
    .             .
    |             ^
    v             |
    .             .
    .             .
    ......->.......
*/

class TorusBoard extends Board {
    constructor(tileClass, N, M) {
        super(tileClass, N, M);
    }

    translate(pos, dir) {
        return [ 
            (pos[0] + dir[0] + this.N) % this.N, 
            (pos[1] + dir[1] + this.M) % this.M 
        ];
    }

}