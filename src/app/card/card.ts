import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class Card {

    // Field errors
    public formErrors = {
        'ownerName': '',
        'ownerCPF': '',
        'cardNumber': '',
        'securityCode': '',
        'hashCard': '',
        'hashBuyer': '',
        'expirationMonth': '',
        'expirationYear': '',
        'brand': '',
    };

    public id: number;
    public ownerName: string;
    public ownerCPF: string;
    public bornDate: Date;
    public phoneNumber: string;
    public areaCode: string;
    public cardNumber: string;
    public securityCode: string;
    public hashCard: string;
    public hashBuyer: string;
    public expirationMonth: number;
    public expirationYear: number;
    public brand: string;

    /**
     * To add more controls, just call: 
     * this.userForm.addControl('formControlName', 
     *  new FormControl(field, [Validators...]);
     * 
     * @param fb injected into your component via constructor
     * 
     */
    public getBasicForm(fb: FormBuilder): FormGroup {
        return fb.group({
            ownerName: [this.ownerName, [Validators.required]],
            ownerCPF: [this.ownerCPF, [Validators.required]],
            bornDate: [this.bornDate, [Validators.required]],
            phoneNumber: [this.phoneNumber, [Validators.required]],
            areaCode: [this.areaCode, [Validators.required]],
            cardNumber: [this.cardNumber, [Validators.required]],
            securityCode: [this.securityCode, [Validators.required]],
            hashCard: [this.hashCard, [Validators.required]],
            hashBuyer: [this.hashBuyer, [Validators.required]],
            expirationMonth: [this.expirationMonth, [Validators.required]],
            expirationYear: [this.expirationYear, [Validators.required]],
        })
    }
}