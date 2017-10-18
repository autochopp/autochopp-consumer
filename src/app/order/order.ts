import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class Order {
    private amount: number;

    constructor(
        // integer quantity of chopps
        private quantity: number,
        // 500ml or 1000ml
        private size: number,
        // string: tradicional ou vinho
        private chopp_type: number,
        // Three types: 0, 1 and 2
        private collar: number
    ) {
        // after set all fields, calculate price
        this.calculateAmount();
    }

    public static buildBasicForm(formBuilder: FormBuilder): FormGroup {
        return formBuilder.group({
            quantity: ['', Validators.required],
            size: ['', Validators.required],
            chopp_type: ['', Validators.required],
            collar: ['', Validators.required]
        });
    }

    /**
     * Calculate price of order
     */
    private calculateAmount(): void {
        this.amount = this.quantity * 5;
    }
}