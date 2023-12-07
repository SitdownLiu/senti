import { Pipe, PipeTransform } from '@angular/core';
import { FormSchemaService } from './form-schema.service';
import { isEmpty } from 'class-validator';

@Pipe({
  name: 'formSchema',
})
export class FormSchemaPipe implements PipeTransform {
  constructor(private formSchemaService: FormSchemaService) {}

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(args);
    if (isEmpty(value)) return '--';

    if (args[0] === 'type') return this.formTypeMethod(value);
    else return this.formEngineTypeMethod(value);
  }

  formTypeMethod(value) {
    const options = this.formSchemaService.loadFormTypeOptions();
    const item = options.find((v) => v.value === value);
    if (isEmpty(item)) return '--';
    else return item.name;
  }

  formEngineTypeMethod(value) {}
}
