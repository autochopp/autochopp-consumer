import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export class Order {
    constructor(
        private quantity: number,
        private type: number,
        private collar: number,
    ) { }

    public static buildBasicForm(formBuilder: FormBuilder): FormGroup {
        return formBuilder.group({
            quantity: ['', Validators.required],
            type: ['', Validators.required],
            collar: ['', Validators.required]
        });
    }
}