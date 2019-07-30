import React from 'react';
// eslint-disable-next-line import/no-duplicates
import * as go from 'gojs';
// eslint-disable-next-line import/no-duplicates
import { ToolManager, Diagram } from 'gojs';
import { GojsDiagram, ModelChangeEventType } from 'react-gojs';
import { getRandomColor } from './ColorHelper';
import './BasicGojs.less';

class BasicGojs extends React.Component {
  nodeId = 0;

  constructor(props) {
    super(props);
    this.createDiagram = this.createDiagram.bind(this);
    this.modelChangeHandler = this.modelChangeHandler.bind(this);
    this.updateColorHandler = this.updateColorHandler.bind(this);
    this.nodeSelectionHandler = this.nodeSelectionHandler.bind(this);
    this.removeNodeHandler = this.removeNodeHandler.bind(this);
    this.removeLink = this.removeLink.bind(this);
    this.addNodeHandler = this.addNodeHandler.bind(this);
    this.updateNodeText = this.updateNodeText.bind(this);
    this.onTextEdited = this.onTextEdited.bind(this);
    this.renderModalHandler = this.renderModalHandler.bind(this);
    this.getSelectedKeys = this.getSelectedKeys.bind(this);
    this.state = {
      selectedNodeKeys: [],
      model: Object.assign({ nodeDataArray: [], linkDataArray: [] }, this.props.model || {}),
      diagramProperty: this.props.diagramProperty ? this.props.diagramProperty : {},
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  /* 节点变更 */
  onTextEdited(e) {
    const tb = e.subject;
    if (tb === null) {
      return;
    }
    const node = tb.part;
    if (node instanceof go.Node) {
      this.updateNodeText(node.key, tb.text);
    }
  }

  /* 获取选中节点 √ */
  getSelectedKeys() {
    return this.state.selectedNodeKeys;
  }

  /* 初始/更新 渲染节点 √ */
  renderModalHandler = ({ renderData }) => {
    this.setState(prevState => ({
      ...prevState,
      ...renderData,
    }));
  };

  /* 给选中节点增加子节点 如果未选择节点，则在根节点添加 ; 默认是当前选中节点 如果传参，以传参为准 √ */
  addNodeHandler = selectedNodes => {
    const selectedNodeKeys = selectedNodes || this.state.selectedNodeKeys;
    const newNodeId = `node${this.nodeId}`;
    const linksToAdd = selectedNodeKeys.map(parent => ({ from: parent, to: newNodeId }));
    this.setState(prevState => ({
      ...prevState,
      model: {
        ...prevState.model,
        nodeDataArray: [
          ...prevState.model.nodeDataArray,
          { key: newNodeId, label: newNodeId, color: getRandomColor() },
        ],
        linkDataArray:
          linksToAdd.length > 0
            ? [...prevState.model.linkDataArray].concat(linksToAdd)
            : [...prevState.model.linkDataArray],
      },
    }));
    this.nodeId += 1;
  };

  /* 删除选中节点 默认是当前选中节点  如果传参，以传参为准 √ */
  removeNodeHandler = selectedNodes => {
    console.log(this.state.selectedNodeKeys);
    console.log(selectedNodes);
    const selectedNodeKeys = selectedNodes || this.state.selectedNodeKeys;
    const nodeToRemoveIndex = this.state.model.nodeDataArray.findIndex(
      node => node.key === selectedNodeKeys
    );
    if (nodeToRemoveIndex === -1) {
      return;
    }
    this.setState(prevState => ({
      ...prevState,
      model: {
        ...prevState.model,
        nodeDataArray: [
          ...prevState.model.nodeDataArray.slice(0, nodeToRemoveIndex),
          ...prevState.model.nodeDataArray.slice(nodeToRemoveIndex + 1),
        ],
      },
    }));
  };

  /* 选中节点更新 */
  nodeSelectionHandler(nodeKey, isSelected) {
    if (isSelected) {
      this.setState(prevState => ({
        ...prevState,
        selectedNodeKeys: [...prevState.selectedNodeKeys, nodeKey],
      }));
    } else {
      const nodeIndexToRemove = this.state.selectedNodeKeys.findIndex(key => key === nodeKey);
      if (nodeIndexToRemove === -1) {
        return;
      }
      this.setState(prevState => ({
        ...prevState,
        selectedNodeKeys: [
          ...prevState.selectedNodeKeys.slice(0, nodeIndexToRemove),
          ...prevState.selectedNodeKeys.slice(nodeIndexToRemove + 1),
        ],
      }));
    }
  }

  /* 创建画布 √ */
  createDiagram(diagramId) {
    const $ = go.GraphObject.make; // 为了简洁定义模板
    // 默认画布属性，可通过diagramProperty自定义
    const defaultProperty = {
      initialContentAlignment: go.Spot.LeftCenter, // 设置居中
      layout: $(go.TreeLayout, {
        angle: 0,
        arrangement: go.TreeLayout.ArrangementVertical,
        treeStyle: go.TreeLayout.StyleLayered,
      }),
      allowDrop: true, // 必须是真的才能接受调色板中的液滴
      isReadOnly: false,
      allowHorizontalScroll: true,
      allowVerticalScroll: true,
      allowZoom: false,
      allowSelect: true,
      autoScale: Diagram.Uniform,
      contentAlignment: go.Spot.LeftCenter,
      TextEdited: this.onTextEdited,
    };
    const panelProperty = Object.assign(defaultProperty, this.state.diagramProperty);
    const myDiagram = $(go.Diagram, diagramId, panelProperty);
    myDiagram.toolManager.panningTool.isEnabled = false;
    myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;
    myDiagram.nodeTemplate = $(
      go.Node,
      'Auto',
      {
        selectionChanged: node => this.nodeSelectionHandler(node.key, node.isSelected),
      },
      $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 }, new go.Binding('fill', 'color')),
      $(go.TextBlock, { margin: 8, editable: true }, new go.Binding('text', 'label'))
    );
    return myDiagram;
  }

  /* 更新节点颜色 √ */
  updateColorHandler() {
    const updatedNodes = this.state.model.nodeDataArray.map(node => ({
      ...node,
      color: getRandomColor(),
    }));
    this.setState(prevState => ({
      ...prevState,
      model: {
        ...prevState.model,
        nodeDataArray: updatedNodes,
      },
    }));
  }

  /* 删除连接线 */
  removeLink(linKToRemove) {
    const linkToRemoveIndex = this.state.model.linkDataArray.findIndex(
      link => link.from === linKToRemove.from && link.to === linKToRemove.to
    );
    if (linkToRemoveIndex === -1) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return {
      ...this.state,
      model: {
        ...this.state.model,
        linkDataArray: [
          ...this.state.model.linkDataArray.slice(0, linkToRemoveIndex),
          ...this.state.model.linkDataArray.slice(linkToRemoveIndex + 1),
        ],
      },
    };
  }

  /* 更新节点的表述 */
  updateNodeText(nodeKey, text) {
    const nodeToUpdateIndex = this.state.model.nodeDataArray.findIndex(
      node => node.key === nodeKey
    );
    if (nodeToUpdateIndex === -1) {
      return;
    }
    this.setState(prevState => ({
      ...prevState,
      model: {
        ...prevState.model,
        nodeDataArray: [
          ...prevState.model.nodeDataArray.slice(0, nodeToUpdateIndex),
          {
            ...prevState.model.nodeDataArray[nodeToUpdateIndex],
            label: text,
          },
          ...prevState.model.nodeDataArray.slice(nodeToUpdateIndex + 1),
        ],
      },
    }));
  }

  /* 画布事件监控 */
  modelChangeHandler(event) {
    switch (event.eventType) {
      case ModelChangeEventType.Remove:
        if (event.nodeData) {
          console.log('event.nodeData.key', event.nodeData.key);
          this.removeNodeHandler(event.nodeData.key);
        }
        if (event.linkData) {
          this.removeLink(event.linkData);
        }
        break;
      default:
        break;
    }
  }

  render() {
    const { diagramId, className } = this.props;
    const { model } = this.state;
    return [
      <GojsDiagram
        key={diagramId || 'gojsDiagram'}
        diagramId={diagramId || 'myDiagramDiv'}
        model={model}
        createDiagram={this.createDiagram}
        className={className || 'myDiagram'}
        onModelChange={this.modelChangeHandler}
      />,
    ];
  }
}

export default BasicGojs;
