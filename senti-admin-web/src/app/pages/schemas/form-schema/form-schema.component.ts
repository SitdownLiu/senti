import { Component, OnInit } from '@angular/core';
import { DialogService, EditableTip, FormLayout, LoadingType, TableWidthConfig } from 'ng-devui';
import { Subscription } from 'rxjs';
import { FormConfig } from 'src/app/@shared/components/admin-form';
import { ListDataService } from './list-data.service';
import { FormSchemaService } from './form-schema.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'da-form-schema',
  templateUrl: './form-schema.component.html',
  styleUrls: ['./form-schema.component.scss'],
})
export class FormSchemaComponent implements OnInit {
  editableTip = EditableTip.btn;
  nameEditing: boolean;
  busy: LoadingType;
  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };
  listData = [];
  headerNewForm = false;

  formTypeOptions = [];

  // 下拉选项
  options = {
    formType: this.formSchemaService.loadFormTypeOptions(),
    formEngineType: [],
  };

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    labelSize: 'sm',
    labelAlign: 'end',
    items: [
      {
        label: 'name',
        prop: 'name',
        type: 'input',
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'type',
        prop: 'type',
        type: 'select',
        filterKey: 'name',
        valueKey: 'value',
        options: this.options.formType,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'remark',
        prop: 'remark',
        type: 'input',
      },
    ],
  };

  formData = {
    name: '',
    type: '',
    remark: '',
  };

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'id',
      width: '180px',
    },
    {
      field: 'name',
      width: '160px',
    },
    {
      field: 'type',
      width: '120px',
    },
    {
      field: 'formEngineType',
      width: '120px',
    },
    {
      field: 'formUrl',
      width: '120px',
    },
    {
      field: 'remark',
      width: '100px',
    },
    {
      field: 'actions',
      width: '160px',
    },
    {
      field: 'operate',
      width: '80px',
    },
  ];

  constructor(
    private listDataService: ListDataService,
    private dialogService: DialogService,
    private formSchemaService: FormSchemaService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getTranslate();
    this.getList();
  }

  // 国际化
  getTranslate() {
    this.translateService.get('page').subscribe((res) => {
      this.formConfig.items.forEach((item) => {
        if (res['formSchema']['columns'][item.label]) {
          item.label = res['formSchema']['columns'][item.label];
        }
      });
    });
  }

  onEditEnd(rowItem, field) {
    rowItem[field] = false;
  }

  getList() {
    // this.busy = this.listDataService.getListData(this.pager).subscribe((res) => {
    //   console.log(res);
    //   const data = JSON.parse(JSON.stringify(res.pageList));
    //   data.$expandConfig = { expand: false };
    //   this.listData = data;
    //   this.pager.total = res.total;
    // });
    this.busy = this.formSchemaService.getList(this.pager).then((res) => {
      console.log(res);
      res.list.$expandConfig = { expand: false };
      this.listData = res.list;
      this.pager.total = res.total;
    });
  }

  beforeEditStart = (rowItem, field) => {
    return true;
  };

  beforeEditEnd = (rowItem, field) => {
    console.log('beforeEditEnd');
    if (rowItem && rowItem[field].length < 3) {
      return false;
    } else {
      return true;
    }
  };

  newRow() {
    this.headerNewForm = true;
  }

  getuuid() {
    return new Date().getTime() + 'CNWO';
  }

  // 新增一条数据
  quickRowAdded(e) {
    console.log(e);
    // const newData = { ...e };
    // this.listData.unshift(newData);
    this.formSchemaService
      .save({ ...e })
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        this.headerNewForm = false;
      });
  }

  // 关闭新增表单
  quickRowCancel() {
    this.headerNewForm = false;
  }

  subRowAdded(index, item) {
    this.listData[index].$expandConfig.expand = false;
    const newData = { ...this.formData };
    this.listData.splice(index + 1, 0, newData);
  }

  subRowCancel(index) {
    this.listData[index].$expandConfig.expand = false;
  }

  toggleExpand(rowItem) {
    if (rowItem.$expandConfig) {
      rowItem.$expandConfig.expand = !rowItem.$expandConfig.expand;
    }
  }

  onPageChange(e) {
    this.pager.pageIndex = e;
    this.getList();
  }

  onSizeChange(e) {
    this.pager.pageSize = e;
    this.getList();
  }

  deleteRow(index) {
    const results = this.dialogService.open({
      id: 'delete-dialog',
      width: '346px',
      maxHeight: '600px',
      title: 'Delete',
      showAnimate: false,
      content: 'Are you sure you want to delete it?',
      backdropCloseable: true,
      onClose: () => {},
      buttons: [
        {
          cssClass: 'primary',
          text: 'Ok',
          disabled: false,
          handler: () => {
            this.listData.splice(index, 1);
            results.modalInstance.hide();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: 'Cancel',
          handler: () => {
            results.modalInstance.hide();
          },
        },
      ],
    });
  }
}
