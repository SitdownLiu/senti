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
import { FormRenderComponent } from './form-render/form-render.component';
import { JsonEditorComponent } from 'src/app/@shared/components/json-editor/json-editor.component';
import { ToolService } from './../../../@core/services/tool.service';

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
    appType: this.formSchemaService.loadAppTypeOptions(),
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
        label: 'appType',
        prop: 'appType',
        type: 'select',
        options: this.options.appType,
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
    appType: '',
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
      width: '100px',
    },
    {
      field: 'appType',
      width: '100px',
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
      field: 'actions',
      width: '120px',
    },
    {
      field: 'operate',
      width: '120px',
    },
  ];

  // “设计”弹框
  formDesignerDrawer: IDrawerOpenResult;
  // “预览”弹框
  formRenderDrawer: IDrawerOpenResult;

  constructor(
    private toastService: ToastService,
    private dialogService: DialogService,
    private formSchemaService: FormSchemaService,
    private translateService: TranslateService,
    private drawerService: DrawerService,
    private toolService: ToolService
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
  openFormDesignerDrawer = (formId: String) => {
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

  // 打开“预览”界面
  openFormRenderDrawer = (formId: String) => {
    this.formRenderDrawer = this.drawerService.open({
      drawerContentComponent: FormRenderComponent,
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
          this.formRenderDrawer.drawerInstance.hide();
        },
      },
    });
  };

  // --------------- 测试数据配置 -----------------//
  activeFormId: string; //当前激活的表单id

  // 打开“测试数据”配置界面
  openFormTestDataConfig = (formId) => {
    this.formSchemaService.queryDetail(formId).then((res) => {
      const { dataSchema } = res;
      const formDataSchemaDialog = this.dialogService.open({
        dialogtype: 'info',
        showAnimation: true,
        title: '数据模型配置（Data Schema Config）',
        maxHeight: '600px',
        width: '600px',
        zIndex: 1000,
        backdropCloseable: true,
        content: JsonEditorComponent,
        data: {
          content: dataSchema,
        },
        buttons: [
          {
            cssClass: 'primary',
            text: '保存',
            disabled: false,
            handler: ($event: Event) => {
              try {
                const dataSchema = JSON.parse(formDataSchemaDialog.modalContentInstance.handlerContent);
                this.formSchemaService
                  .patchConfig(formId, {
                    dataSchema: formDataSchemaDialog.modalContentInstance.handlerContent,
                  })
                  .then((res) => {
                    this.toolService.openModal({
                      type: 'success',
                      title: '操作成功',
                      content: `ID[${formId}]的表单数据模型配置已保存。`,
                    });
                    formDataSchemaDialog.modalInstance.hide();
                  })
                  .finally(() => {});
              } catch (error) {
                this.toolService.openModal({
                  type: 'failed',
                  title: '类型错误',
                  content: '不是有效的JSON格式。',
                });
              }
            },
          },
          {
            id: 'btn-cancel',
            cssClass: 'common',
            text: '关闭',
            handler: ($event: Event) => {
              formDataSchemaDialog.modalInstance.hide();
            },
          },
        ],
      });
    });
  };
}
