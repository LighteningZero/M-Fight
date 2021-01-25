import { Schema, type } from "@colyseus/schema";
import Config from '../constants';
import { random_x, random_y, rect_check_crash, CommonEntity } from '../utility';

export abstract class Bullets extends Schema {
    @type('number')
    x: number

    @type('number')
    y: number

    @type('int8')
    d: number

    @type('uint32')
    len: number
};