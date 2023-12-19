import { Component, OnInit, NgZone } from '@angular/core';
import { FormLayout } from 'ng-devui/form';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss'],
})
export class TestFormComponent implements OnInit {
  layoutDirection: FormLayout = FormLayout.Horizontal;
  inputDemoConfig: any;
  textareaDemoConfig: any;
  selectDemoConfig: any;
  multipleSelectDemoConfig: any;
  multipleSelect2DemoConfig: any;
  radioDemoConfig: any;
  toggleDemoConfig: any;
  checkboxDemoConfig: any;
  singleDateDemoConfig: any;
  multiDateDemoConfig: any;
  inputDemoConfig2: any;
  selectDemoconfig2: any;
  multipleSelectDemoConfig3: any;
  singleDateDemoConfig2: any;

  formShow: boolean = true;

  disabled: false;

  labelList = [
    {
      id: 1,
      label: 'Option1',
    },
    {
      id: 2,
      label: 'Option2',
    },
    {
      id: 3,
      label: 'Option3',
    },
  ];

  addedLabelList = [];

  selectOptions = [
    {
      id: 1,
      label: 'Option1',
    },
    {
      id: 2,
      label: 'Option2',
    },
    {
      id: 3,
      label: 'Option3',
    },
  ];

  radioOptions = [
    {
      id: 1,
      label: 'Manual execution',
    },
    {
      id: 2,
      label: 'Daily execution',
    },
    {
      id: 3,
      label: 'Weekly execution',
    },
  ];

  checkboxOptions = [
    { id: '1', label: 'Mon', checked: true },
    { id: '2', label: 'Tue' },
    { id: '3', label: 'Wed' },
    { id: '4', label: 'Thur' },
    { id: '5', label: 'Fri' },
    { id: '6', label: 'Sat' },
    { id: '0', label: 'Sun' },
  ];

  formId = '';
  formData = {
    userName: '',
    description: '',
    selectValue: {},
    multipleSelectValue: [],
    multipleSelect2Value: [],
    radioValue: {},
    toggleValue: false,
    singDateValue: '',
    multiDateValue: {
      startDate: '',
      endDate: '',
    },
    inputValue2: '',
    singDateValue2: '',
  };
  businessId = '';

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.multipleSelect2DemoConfig = {
      key: 'multipleSelect-demo2',
      label: 'Options(Multiple selection with delete)',
      isSearch: true,
      multiple: 'true',
      labelization: { enable: true, labelMaxWidth: '120px' },
      options: this.selectOptions,
    };

    // 通知主应用：渲染完成
    window.microApp.dispatch({ type: 'event', name: 'mounted' });
    // 监听：主应用的消息
    window.microApp.addDataListener((data) => this.onMainAppData(data));
  }

  onMainAppData(data) {
    console.log(data);
    const { type, name } = data;

    // 处理事件：event
    if (type === 'event') {
      if (name === 'submit') this.getFormData();
    }

    // 处理消息:message
    if (type === 'message') {
      const { value } = data;
      if (name === 'formData') this.setFormData(value);
    }
  }

  // 加载表单数据
  setFormData(data) {
    if (data.businessId) this.businessId = data.businessId;
    if (data.formData) {
      this.formData = Object.assign(this.formData, data.formData);
      this.ngZone.run(() => this.formData);
    }
  }
  // 获取表单数据
  getFormData() {
    window.microApp.dispatch({ type: 'message', name: 'formData', value: this.formData });
  }
}
