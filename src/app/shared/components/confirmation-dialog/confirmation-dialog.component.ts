import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/models/dialog-data';

import { useAngularMaterialModules } from '../../shared.module';

@Component({
    selector: 'app-confirmation-dialog',
    standalone: true,
    imports: useAngularMaterialModules(),
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    onConfirm(result: boolean): void {
        if (this.data.subject) {
            this.data.subject.next(result);
            this.data.subject.complete();
        }

        this.dialogRef.close(result);
    }
}
