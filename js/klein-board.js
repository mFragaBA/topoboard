/*
    Implements an NxM klein board such as

    ......<-.......
    .             .
    .             .
    ^             ^
    |             |
    .             .
    .             .
    ......->.......
*/

class KleinBoard extends Board {
    constructor(tileClass, N, M) {
        super(tileClass, N, M);
    }

    translate(pos, dir) {
        let flip = ((pos[0] + dir[0]) < 0) || ((pos[0] + dir[0]) >= this.N);

        if (flip) {
            return [ 
                (pos[0] + dir[0] + this.N) % this.N, 
                (this.M - 1 - (((pos[1] + dir[1]) + this.M) % this.M))
            ];
        } else {
            return [ 
                (pos[0] + dir[0] + this.N) % this.N, 
                (((pos[1] + dir[1]) + this.M) % this.M)
            ];
        }
    }

}