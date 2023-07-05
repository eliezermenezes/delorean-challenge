import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { DialogService } from './services/dialog.service';
import { SessionStorageService } from './services/session-storage.service';

const standaloneComponents = [ConfirmationDialogComponent];

const angularMaterialModules = [
    NgFor,
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatDialogModule,
];

export function useSharedComponents(): Array<Type<any>> {
    return [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        ...standaloneComponents,
        ...angularMaterialModules,
    ];
}

export function useAngularMaterialModules(): Array<Type<any>> {
    return angularMaterialModules;
}

@NgModule({
    imports: useSharedComponents(),
    exports: useSharedComponents(),
    providers: [SessionStorageService, DialogService],
})
export class SharedModule {}
