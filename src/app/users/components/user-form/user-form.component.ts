import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitterType } from 'src/app/core/enums/event-emitter.enum';
import { EventEmitterService } from 'src/app/shared/services/event-emitter.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { User } from '../../models/user';

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [SharedModule],
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
    user!: User | null;
    formGroup: FormGroup;

    @Output() add = new EventEmitter<User>();
    @Output() update = new EventEmitter<User>();

    constructor(private _formBuilder: FormBuilder) {
        this.formGroup = this._createFormGroup();

        EventEmitterService.get<User>(EventEmitterType.UPDATE_USER).subscribe(
            (data) => {
                this.user = data;
                this._updateFormGroup();
            }
        );
    }

    private _createFormGroup(): FormGroup {
        return this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });
    }

    private _updateFormGroup(): void {
        this.formGroup.patchValue({
            name: this.user?.name,
            email: this.user?.email,
        });
    }

    private _validate(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach((key) => {
            const control = formGroup.controls[key];
            control.markAsTouched();
            control.markAsDirty();
        });
    }

    onSave() {
        if (this.formGroup.invalid) {
            this._validate(this.formGroup);
        } else {
            const data = this.formGroup.value;

            this.user
                ? this.update.emit({ ...data, id: this.user.id })
                : this.add.emit(data);
            this.formGroup.reset();
        }
    }

    onCancel(): void {
        this.user = null;
        this.formGroup.reset();
    }
}
