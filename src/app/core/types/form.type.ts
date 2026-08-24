import { AbstractControl, FormControl } from '@angular/forms';

export type FormMap<T> = {
  [Key in keyof T]: T[Key] extends AbstractControl ? T[Key] : FormControl<T[Key]>;
};
