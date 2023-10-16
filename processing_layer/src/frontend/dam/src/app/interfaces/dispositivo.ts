import { Medicion } from "./medicion";
import {  Riego } from "./riego";

export interface Dispositivo {
    id: number,
    name: string,
    lastReadingValue:number,
    location: string,
    lastReadingDate: string,
    valveName: string,
    valveId: number,
    riegos: Riego[],
    mediciones: Medicion[],
    state: boolean

}