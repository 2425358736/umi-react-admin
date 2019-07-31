/* eslint-disable no-undef,no-param-reassign */
import React from 'react';
import { GojsDiagram } from 'react-gojs';
import { notification } from 'antd';
import styles from './index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {
        class: 'go.GraphLinksModel',
        nodeDataArray: [
          {
            key: 1,
            color: '#ff3a46',
            text: 'A',
            controlledKey: [2, 3, 4],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 2,
            color: '#8bff65',
            text: 'B',
            controlledKey: [],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 3,
            color: '#4f4fff',
            text: 'C',
            controlledKey: [5, 6, 7],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 4,
            color: '#e770ff',
            text: 'D',
            controlledKey: [8, 9, 10],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 5,
            color: '#c9ffe0',
            text: 'E',
            controlledKey: [11],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },

          {
            key: 6,
            color: '#ff3a97',
            text: 'F',
            controlledKey: [],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },

          {
            key: 7,
            color: '#7b8dff',
            text: 'G',
            controlledKey: [],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 8,
            color: '#9bff96',
            text: 'H',
            controlledKey: [],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 9,
            color: '#221bff',
            text: 'I',
            controlledKey: [],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 10,
            color: '#ff32ff',
            text: 'J',
            controlledKey: [],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 11,
            color: '#ff4e97',
            text: 'K',
            controlledKey: [],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
        ],
        linkDataArray: [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 1, to: 4 },
          { from: 3, to: 5 },
          { from: 3, to: 6 },
          { from: 3, to: 7 },
          { from: 4, to: 8 },
          { from: 4, to: 9 },

          { from: 4, to: 10 },
          { from: 5, to: 11 },
        ],
      },
    };
  }

  createDiagram = diagramId => {
    const $ = go.GraphObject.make;

    const myDiagram = $(go.Diagram, diagramId, {
      allowZoom: true, // 是否允许缩放
      'animationManager.isEnabled': true, // 是否关闭自动动画
      'grid.visible': false, // 是否显示整个图表的背景网格
      'grid.gridCellSize': new go.Size(20, 20), // 网络单元格大小
      // 允许在后台双击以创建新节点
      'clickCreatingTool.archetypeNodeData': { text: 'Node' },
      // 允许ctrl-g调用groupselection命令
      'commandHandler.archetypeGroupData': { text: 'Group', isGroup: true, color: 'blue' },
      'commandHandler.copiesTree': false, // 对于copy命令
      'commandHandler.deletesTree': false, // 对于删除命令
      'toolManager.hoverDelay': 100, // 显示工具提示的速度
      // 鼠标滚轮缩放而不是滚动
      'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom,
      'draggingTool.dragsTree': false, // 拖动以进行移动和复制
      'draggingTool.isGridSnapEnabled': true,
      layout: $(go.TreeLayout, { angle: 90, sorting: go.TreeLayout.SortingAscending }),
      'undoManager.isEnabled': false, // 启用撤消和恢复
    });

    myDiagram.nodeTemplate = $(
      go.Node,
      'Auto',
      $(go.Shape, 'RoundedRectangle', new go.Binding('fill', 'color')),
      $(go.TextBlock, new go.Binding('text', 'text')),
      $(
        go.Picture,
        {
          background: 'gray',
          width: 50,
          height: 50,
        },
        new go.Binding('source', 'url')
      ),
      {
        click: (e, node) => {
          const { controlledKey } = node.jb;

          const node2 = myDiagram.model.findNodeDataForKey(node.jb.key);
          myDiagram.model.setDataProperty(
            node2,
            'url',
            'https://hbimg.huabanimg.com/a8c4a8468a054525dbc2ea00f5bfc86f03966922789e5-GSERd9_fw658'
          );

          controlledKey.forEach(key => {
            const node1 = myDiagram.model.findNodeDataForKey(key);
            myDiagram.model.setDataProperty(node1, 'color', '#ededed');
          });
          notification.open({
            message: JSON.stringify(node.jb),
          });
        },
        toolTip: $(
          'ToolTip',
          $(
            go.TextBlock,
            { margin: 4, width: 140 },
            new go.Binding('text', '', ({ jb }) => `key=${jb.key}::::::text=${jb.text}`).ofObject()
          )
        ),
      }
    );

    // 定义一个直角路由形式的连线模板, 去掉箭头
    myDiagram.linkTemplate = $(
      go.Link,
      {
        toShortLength: -2,
        fromShortLength: -2,
        layerName: 'Background',
        routing: go.Link.Orthogonal,
        corner: 15,
        fromSpot: go.Spot.RightSide,
        toSpot: go.Spot.LeftSide,
      },
      // make sure links come in from the proper direction and go out appropriately
      new go.Binding('fromSpot', 'fromSpot', d => spotConverter(d)),
      new go.Binding('toSpot', 'toSpot', d => spotConverter(d)),
      new go.Binding('points').makeTwoWay(),
      // mark each Shape to get the link geometry with isPanelMain: true
      $(
        go.Shape,
        { isPanelMain: true, stroke: '#41BFEC' /* blue */, strokeWidth: 10 },
        new go.Binding('stroke', 'color')
      ),
      $(go.Shape, {
        isPanelMain: true,
        stroke: 'white',
        strokeWidth: 3,
        name: 'PIPE',
        strokeDashArray: [20, 40],
      })
    );

    return myDiagram;
  };

  render() {
    const { model } = this.state;
    return (
      <GojsDiagram
        diagramId="myDiagramDiv"
        model={model}
        createDiagram={this.createDiagram}
        className={styles.myDiagram}
      />
    );
  }
}

export default Index;
