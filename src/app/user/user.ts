import { FormBuilder, Validators, FormGroup } from '@angular/forms';

export class User {

  // Field errors
  formErrors = {
    'email': '',
    'password': '',
    'password_confirmation': ''
  };

  // All validations used into forms
  validationMessages = {
    'email': {
      'required': 'Por favor, insira seu email',
      'pattern': 'Isso não parece ser um email válido!'
    },
    'password': {
      'required': 'Por favor, insira seu password',
      'minlength': 'Senha precisa ter no mínimo 6 caracteres'
    },
    'password_confirmation': {
      'required': 'Por favor, confirme sua senha',
      'passwordConfirmation': 'Confirmação inválida'
    }
  };

  // transient field, not required
  public password_confirmation: string

  constructor(
    public email: string,
    public password: string,
  ) { }

  /**
   * To add more controls, just call: 
   * this.userForm.addControl('formControlName', 
   *  new FormControl(field, [Validators...]);
   * 
   * @param fb injected into your component via constructor
   */
  getBasicForm(fb: FormBuilder): FormGroup {
    return fb.group({
      email: [this.email, [
        Validators.required, Validators.pattern('[^ @]*@[^ @]*')
      ]
      ],
      password: [this.password, [
        Validators.required, Validators.minLength(6)
      ]
      ]
    })
  }
}