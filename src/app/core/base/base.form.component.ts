import { FormGroup } from '@angular/forms';

export class BaseFormComponent {
    formGroup!: FormGroup;

    validate(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach((key) => {
            const control = formGroup.controls[key];
            control.markAsTouched();
            control.markAsDirty();
        });
    }

    getErrorMessage(fieldName: string): string {
        const field = this.formGroup.get(fieldName);

        if (!field?.invalid) {
            return '';
        }

        const errors = field?.errors;

        const messages = new Map()
            .set('required', 'Este campo é obrigatório')
            .set('email', 'Este campo deve ser um e-mail válido')
            .set('minlength', `Este campo deve ter no mínimo ${field.errors?.['minlength']?.requiredLength} caracteres`);

        return messages.get(Object.keys(field.errors!)[0]);
    }
}
