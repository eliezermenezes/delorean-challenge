import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [SharedModule, UserFormComponent, UserListComponent],
    providers: [UsersService],
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
    users: User[] = [];

    constructor(
        private _snackBar: MatSnackBar,
        private _usersService: UsersService
    ) {
        this._onPopulate();
    }

    private _onPopulate(): void {
        this.users = this._usersService.list();
    }

    private _openSnackBar(msg: string) {
        this._snackBar.open(msg, 'Fechar', {
            duration: 5000,
        });
    }

    onAdd(user: User): void {
        this._usersService.add(user);
        this._onPopulate();
        this._openSnackBar('Usuário cadastrado com sucesso!');
    }

    onUpdate(user: User): void {
        this._usersService.edit(user);
        this._onPopulate();
        this._openSnackBar('Usuário atualizado com sucesso!');
    }

    onDelete(user: User): void {
        this._usersService.delete(user);
        this._onPopulate();
        this._openSnackBar('Usuário deletado com sucesso!');
    }

    onDeleteMultiple(users: User[]): void {
        for (const user of users) {
            this._usersService.delete(user);
        }
        this._onPopulate();
        this._openSnackBar('Usuários deletados com sucesso!');
    }
}
