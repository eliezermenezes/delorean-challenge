import { EventEmitter } from '@angular/core';
import { EventEmitterType } from 'src/app/core/enums/event-emitter.enum';

export class EventEmitterService {
    private static _emitters: {
        [eventName: string]: EventEmitter<any>;
    } = {};

    static get<T>(eventName: EventEmitterType): EventEmitter<T> {
        if (!this._emitters[eventName]) {
            this._emitters[eventName] = new EventEmitter<T>();
        }
        return this._emitters[eventName];
    }

    static emit<T>(eventName: EventEmitterType, data: T): void {
        EventEmitterService.get(eventName).emit(data);
    }
}
