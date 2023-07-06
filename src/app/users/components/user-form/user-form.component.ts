import { AfterContentChecked, Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/core/base/base.form.component';
import { EventEmitterType } from 'src/app/core/enums/event-emitter.enum';
import { Utils } from 'src/app/core/utils';
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
export class UserFormComponent extends BaseFormComponent implements AfterContentChecked {
    readonly technologies = [
        'Angular',
        'React',
        'Vue.js',
        'Ionic',
        'Python',
        'Node',
    ];

    user!: User | null;

    @Output() add = new EventEmitter<User>();
    @Output() update = new EventEmitter<User>();

    constructor(private _formBuilder: FormBuilder) {
        super();
        this._createFormGroup();

        EventEmitterService.get<User>(EventEmitterType.UPDATE_USER).subscribe(
            (data) => {
                this.user = data;
                this._updateFormGroup();
            }
        );
    }

    ngAfterContentChecked(): void {
        Utils.scrollToTop();
    }

    private get _statesTechnologies(): boolean[] {
        return this.technologies.map(
            (technology) => this.user?.technologies.includes(technology) || false
        );
    }

    private get _builtTechnologies(): FormArray {
        const controls = this._statesTechnologies.map((state) =>
            this._formBuilder.control(state)
        );

        return this._formBuilder.array(controls);
    }

    private get _selectedTechnologies(): string[] {
        return this.formGroup.value.technologies
            .map((checked: boolean, index: number) =>
                checked ? this.technologies[index] : null
            )
            .filter((value: string | null) => value !== null);
    }

    private _createFormGroup(): void {
        this.formGroup = this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            technologies: this._builtTechnologies,
        });
    }

    private _updateFormGroup(): void {
        this.formGroup.patchValue({
            name: this.user?.name,
            email: this.user?.email,
            technologies: this._statesTechnologies,
        });
    }

    onSave() {
        if (this.formGroup.invalid) {
            this.validate(this.formGroup);
        } else {
            const data = {
                ...this.formGroup.value,
                technologies: this._selectedTechnologies,
            };

            this.user ? this.update.emit({ ...data, id: this.user.id }) : this.add.emit(data);
            this.formGroup.reset();
        }
    }

    onCancel(): void {
        this.user = null;
        this.formGroup.reset();
    }
}
