<template>
  <div id="dmnContainer" class="dmnContainer"></div>
</template>

<script setup name="DmnDesigner">
import { ref, onMounted, onUnmounted } from 'vue';
import validate from 'validate.js';

// import dmn.js ----------------------------------------------
import 'dmn-js/dist/assets/diagram-js.css';
import 'dmn-js/dist/assets/dmn-js-shared.css';
import 'dmn-js/dist/assets/dmn-js-drd.css';
import 'dmn-js/dist/assets/dmn-js-decision-table.css';
import 'dmn-js/dist/assets/dmn-js-decision-table-controls.css';
import 'dmn-js/dist/assets/dmn-js-literal-expression.css';
import 'dmn-js/dist/assets/dmn-font/css/dmn.css';
import DmnModeler from 'dmn-js/lib/Modeler';
import DmnViewer from 'dmn-js/lib/Viewer';
// --------------------------------- dmn.js end

const dmnRef = ref();
const isSelector = ref(true);

onMounted(() => {
  // 通知主应用：渲染完成
  window.microApp.dispatch({ type: 'event', name: 'mounted' });
  // 监听：主应用的消息
  window.microApp.addDataListener((data) => onMainAppData(data));
});

onUnmounted(() => {
  // 清空当前子应用的所有绑定函数(全局数据函数除外)
  window.microApp.clearDataListener();
});

// 监听：主应用的消息
const onMainAppData = (data) => {
  console.log(data);
  const { type } = data;
  // 处理事件：event
  if (type === 'event') {
    const { name } = data;
    // 获取数据
    if (name === 'save') getData();
  }

  // 处理消息:message
  if (type === 'message') {
    const { name, value } = data;
    // 加载dmn设计器
    if (name === 'dmnXml') loadDmnDesigner(value);
  }
};

// 加载dmn设计器
const loadDmnDesigner = async (value) => {
  isSelector.value = value.isSelector;
  // 初始化并加载图表：diagram
  const xml = await initDiagram(value);
  initDmnJS(xml);
};

// 初始化图表：diagram
const initDiagram = ({ ruleId, ruleCode, xml }) => {
  const key = new Date().getTime();

  const name = validate.isEmpty(ruleCode) ? ruleCode : 'RULE_' + key;
  const id = 'rule_' + ruleId;

  if (validate.isEmpty(xml)) {
    let str = '<?xml version="1.0" encoding="UTF-8"?>';
    str +=
      '<definitions id="' +
      id +
      '" name="' +
      name +
      '" xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" xmlns:modeler="http://camunda.org/schema/modeler/1.0"  namespace="http://camunda.org/schema/1.0/dmn" exporter="Camunda Modeler" exporterVersion="5.13.0" modeler:executionPlatform="Camunda Cloud" modeler:executionPlatformVersion="8.2.0">';
    str += '</definitions>';
    return str;
  }

  return xml;
};

// 初始化dmn.js
const initDmnJS = (xml) => {
  dmnRef.value = !isSelector.value
    ? new DmnModeler({
        container: '#dmnContainer',
      })
    : new DmnViewer({
        container: '#dmnContainer',
      });
  dmnRef.value.importXML(xml);
};

// 获取dmn数据
const getData = () => {
  dmnRef.value.saveXML().then((ret) => {
    const { xml } = ret;
    window.microApp.dispatch({
      type: 'message',
      name: 'dmnXml',
      value: xml,
    });
  });
};
</script>

<style lang="scss" scoped>
.dmnContainer {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>

<style lang="scss">
// 隐藏dmn.js的logo
.bjs-powered-by {
  display: none;
}
</style>
