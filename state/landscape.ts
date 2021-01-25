import { Schema, type } from "@colyseus/schema";
import Config from '../constants';
import { random_x, random_y, rect_check_crash, CommonEntity } from '../utility';

export class Land extends Schema {
    @type('number')
    x: number
    
    @type('number')
    y: number
    
    @type('uint32')
    len: number

    constructor(x: number, y: number, len: number) {
        super();
        this.x = x || random_x();
        this.y = y || random_y();
        this.len = len || Config.land.init.len;
    }

    check_crash(target: CommonEntity) {
        return rect_check_crash({
            x: this.x,
            y: this.y,
            xl: this.len,
        }, target);
    };
};