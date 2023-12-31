import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventEmitterType } from 'src/app/core/enums/event-emitter.enum';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EventEmitterService } from 'src/app/shared/services/event-emitter.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [SharedModule],
    providers: [UsersService],
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
    readonly displayedColumns: string[] = [
        'select',
        'name',
        'email',
        'actions',
    ];

    @Input() users: User[] = [];

    @Output() delete = new EventEmitter<User>();
    @Output() deleteMultiple = new EventEmitter<User[]>();

    selection = new SelectionModel<User>(true, []);

    constructor(private _dialog: DialogService) {}

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.users.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.users);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: User): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

    onEdit(user: User): void {
        EventEmitterService.emit(EventEmitterType.UPDATE_USER, user);
    }

    onDelete(user: User): void {
        this._dialog
            .confirm('Deseja realmente excluir o usuário?')
            .subscribe((result: boolean) => {
                if (result) {
                    this.delete.emit(user);
                }
            });
    }

    onDeleteMultiple(): void {
        this._dialog
            .confirm('Deseja realmente excluir os usuários selecionados?')
            .subscribe((result: boolean) => {
                if (result) {
                    this.deleteMultiple.emit(this.selection.selected);
                    this.selection.clear();
                }
            });
    }
}
