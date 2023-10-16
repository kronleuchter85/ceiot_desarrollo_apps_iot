import { Mesure } from "./measure";

export interface Device {
    deviceId: number,
    deviceDescription: string,
    lastMeasureValue:number,
    lastMeasureTime:string,
    lastMeasureLocation: string,
    measures: Mesure[],
    status: string
}