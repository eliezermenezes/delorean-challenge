import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';

import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    constructor(public dialog: MatDialog) {}

    confirm(msg: string): Observable<boolean> {
        const subject = new Subject<boolean>();

        this.dialog.open(ConfirmationDialogComponent, {
            data: { msg, subject },
        });

        return subject.asObservable();
    }
}
