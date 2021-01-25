import { Schema, type, ArraySchema } from "@colyseus/schema";
import { Land } from './landscape';
import Config from '../constants';

export class Player extends Schema {
    @type('number')
    x: number

    @type('number')
    y: number

    @type('number')
    blood: number

    @type('int8')
    d: number

    xa = 0
    ya = 0
    xaa = 0
    yaa = Config.yaa
    space_jump = 0
    in_abs_hit_ttl = 0

    constructor() {
        super();
        this.x = Math.random() * Config.board.width;
        this.y = Config.player.init.height;
        this.blood = Config.player.init.blood;
        this.d = 1;
    }

    jump() {
        if (this.space_jump >= Config.player.limit.jump) { return; }
        this.ya = Config.player.attribute.jump;
        this.space_jump += 1;
    }

    alive(): boolean {
        return this.blood >= 0;
    }

    update(lands: ArraySchema<Land>) {
        this.in_abs_hit_ttl -= 1;

        if (Math.abs(this.xa) < 1e-6) { this.xaa = 0; }
        this.xa += this.xaa;
        this.ya += this.yaa;
        this.ya = Math.min(this.ya, 10);
        this.x += this.xa;

        if (this.ya >= 0) {
            let break_mark = false;
            lands.forEach(element => {
                if (break_mark) { return; }
                if (element.check_crash({
                    x: this.x,
                    y: this.y,
                    xa: this.xa,
                    ya: this.ya,
                    xl: Config.player.attribute.width,
                    yl: Config.player.attribute.height,
                })) {
                    this.y = element.y - Config.player.attribute.height;
                    this.ya = 0;
                    this.space_jump = 0;
                    break_mark = true;
                }
            });
        }
        this.y += this.ya;

        if (this.gun.update()) {
            this.gun = new Rifle();
        }

        this.bullets.update((e) => {
            e.update();
            e.draw();
        });

        this.collect_crate();
    }
};