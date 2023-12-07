import { FormLayout } from 'ng-devui';

export interface FormConfig {
  layout: FormLayout;
  labelSize: 'sm' | 'lg' | '';
  labelAlign: 'start' | 'center' | 'end';
  items: any;
}
