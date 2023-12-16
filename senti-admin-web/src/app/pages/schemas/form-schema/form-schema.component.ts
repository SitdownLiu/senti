import { Component, OnInit } from '@angular/core';
import {
  DialogService,
  EditableTip,
  FormLayout,
  LoadingType,
  TableWidthConfig,
  ToastService,
} from 'ng-devui';
import { FormConfig } from 'src/app/@shared/components/admin-form';
import { FormSchemaService } from './form-schema.service';
import { TranslateService } from '@ngx-translate/core';
import { DrawerService, IDrawerOpenResult } from 'ng-devui/drawer';
import { FormDesignerComponent } from './form-designer/form-designer.component';

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

  // 下拉选项
  options = {
    formType: this.formSchemaService.loadFormTypeOptions(),
    formEngineType: this.formSchemaService.loadFormEngineTypeOptions(),
  };

  // “新增”表单
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

  // 列表配置
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

  // “设计”弹框
  formDesignerDrawer: IDrawerOpenResult;

  constructor(
    private toastService: ToastService,
    private dialogService: DialogService,
    private formSchemaService: FormSchemaService,
    private translateService: TranslateService,
    private drawerService: DrawerService
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

  // 查询列表数据
  getList() {
    this.busy = this.formSchemaService.getList(this.pager).then((res) => {
      res.list.$expandConfig = { expand: false };
      this.listData = res.list;
      this.pager.total = res.total;
    });
  }

  // 激活编辑框
  beforeEditStart = (rowItem, field) => {
    return true;
  };

  // 提交编辑结果
  beforeEditEnd = (rowItem, field) => {
    const params = {};
    const { id } = rowItem;
    params[field] = rowItem[field];
    console.log('beforeEditEnd', rowItem, field);
    return this.formSchemaService.patchList(id, params).then((res) => {
      if (res) {
        const index = this.listData.findIndex((v) => v.id === id);
        this.toastService.open({
          value: [{ severity: 'success', summary: '修改成功', content: `您修改了第 ${index + 1} 行数据。` }],
          life: 8000,
        });
        return true;
      } else false;
    });
  };

  // 展开‘新增’表单
  newRow() {
    this.headerNewForm = true;
  }

  // 新增一条数据
  quickRowAdded(e) {
    this.formSchemaService
      .save({ ...e })
      .then((res) => {
        this.toastService.open({
          value: [{ severity: 'success', summary: '添加成功', content: `已经添加了一条表单模型数据。` }],
          life: 8000,
        });
        this.getList();
      })
      .finally(() => {
        this.headerNewForm = false;
      });
  }

  // 关闭新增表单
  quickRowCancel() {
    this.headerNewForm = false;
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

  deleteRow(item, index) {
    const results = this.dialogService.open({
      width: '346px',
      maxHeight: '600px',
      placement: 'top',
      // offsetY: '300px',
      title: '操作确认',
      content: `删除数据后不可恢复，确定要删除列表中第 ${index + 1} 行数据吗？`,
      showAnimate: false,
      backdropCloseable: true,
      onClose: () => {},
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          disabled: false,
          handler: () => {
            this.formSchemaService
              .deleteList(item.id)
              .then((res) => {
                this.toastService.open({
                  value: [
                    { severity: 'success', summary: '删除成功', content: `已经删除了一条表单模型数据。` },
                  ],
                  life: 8000,
                });
                this.getList();
              })
              .finally(() => results.modalInstance.hide());
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: '取消',
          handler: () => {
            results.modalInstance.hide();
          },
        },
      ],
    });
  }

  // 打开“设计”界面
  openFormDesignerDrawer = (formId) => {
    this.formDesignerDrawer = this.drawerService.open({
      drawerContentComponent: FormDesignerComponent,
      width: '100vw',
      zIndex: 1000,
      isCover: true,
      fullScreen: true,
      backdropCloseable: true,
      escKeyCloseable: true,
      position: 'right',
      data: {
        formId,
        close: (event) => {
          this.formDesignerDrawer.drawerInstance.hide();
        },
      },
    });
  };
}
