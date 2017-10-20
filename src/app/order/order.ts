import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class Order {
    public amount: number;

    constructor(
        // integer quantity of chopps
        public quantity: number,
        // 500ml or 1000ml
        public size: number,
        // string: tradicional ou vinho
        public chopp_type: number,
        // Three types: 0, 1 and 2
        public collar: number
    ) {}

    public static buildBasicForm(formBuilder: FormBuilder): FormGroup {
        return formBuilder.group({
            quantity: ['', Validators.required],
            size: ['', Validators.required],
            chopp_type: ['', Validators.required],
            collar: ['', Validators.required]
        });
    }

    /**
     * Calculate price of chopp
     */
    public static calculateAmount(size_chopp: number): number {
      if (size_chopp == 500){
          return 7.00;
      }
      else if(size_chopp == 1000){
          return 12.00;
      }
    }

}