import { Player } from './player';
import { Land } from './landscape';
import { Schema, type, ArraySchema, MapSchema } from "@colyseus/schema";
// import { Player } from './gun';

export class State extends Schema {
    @type([ Land ])
    lands = new ArraySchema<Land>()

    @type({ map: Player })
    players = new MapSchema<Player>()
}