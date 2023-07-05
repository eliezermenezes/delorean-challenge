// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from 'src/app/core/utils';

import { SessionStorageService } from '../../shared/services/session-storage.service';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private _storage: SessionStorageService) {}

    list(): User[] {
        return this._storage.get('users', []);
    }

    add(user: User): void {
        const users = this.list();
        user.id = Utils.generateId(users);
        users.push(user);
        this._storage.set('users', users);
    }

    edit(user: User): void {
        const users = this.list();
        const index = users.findIndex((u) => u.id === user.id);
        console.log(index);
        users[index] = user;
        this._storage.set('users', users);
    }

    delete(user: User): void {
        const users = this.list();
        const index = users.findIndex((u) => u.id === user.id);
        users.splice(index, 1);
        this._storage.set('users', users);
    }
}
