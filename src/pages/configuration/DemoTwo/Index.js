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
            pos: '500 -300',
            controlledKey: [2, 3, 4],
            width: 50,
            height: 50,
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 2,
            color: '#8bff65',
            text: 'B',
            pos: '500 -200',
            controlledKey: [],
            width: 50,
            height: 50,
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 3,
            color: '#4f4fff',
            text: 'C',
            pos: '300 -200',
            controlledKey: [5, 6, 7],
            width: 50,
            height: 50,
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 4,
            color: '#e770ff',
            text: 'D',
            pos: '700 -200',
            controlledKey: [8, 9, 10],
            width: 50,
            height: 50,
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 5,
            color: '#c9ffe0',
            text: 'E',
            pos: '200 -100',
            controlledKey: [11],
            width: 50,
            height: 50,
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },

          {
            key: 6,
            color: '#ff3a97',
            text: 'F',
            pos: '300 -100',
            controlledKey: [],
            width: 50,
            height: 50,
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },

          {
            key: 7,
            color: '#7b8dff',
            text: 'G',
            pos: '400 -100',
            controlledKey: [],
            width: 50,
            height: 50,
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 8,
            color: '#9bff96',
            text: 'H',
            pos: '600 -100',
            controlledKey: [],
            width: 50,
            height: 50,
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 9,
            color: '#221bff',
            text: 'I',
            pos: '700 -100',
            controlledKey: [],
            width: 50,
            height: 50,
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 10,
            color: '#ff32ff',
            text: 'J',
            pos: '800 -100',
            controlledKey: [],
            width: 50,
            height: 50,
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 11,
            color: '#ff4e97',
            text: 'K',
            pos: '200 0',
            controlledKey: [],
            width: 50,
            height: 50,
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 12,
            color: '#ff4e97',
            text: '图片1',
            pos: '950 -400',
            width: 90,
            height: 90,
            controlledKey: [],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 14,
            color: '#ff4e97',
            text: '图片2',
            pos: '1050 -400',
            width: 90,
            height: 90,
            controlledKey: [],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 15,
            color: '#ff4e97',
            text: '图片3',
            pos: '1150 -400',
            width: 90,
            height: 90,
            controlledKey: [],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 16,
            color: '#ff4e97',
            text: '图片3',
            pos: '0 -400',
            width: 90,
            height: 90,
            controlledKey: [],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
          {
            key: 17,
            color: '#ff4e97',
            text: '图片3',
            pos: '100 -400',
            width: 90,
            height: 90,
            controlledKey: [],
            url:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564554589343&di=52a4f93e1d3e95cb3bbfc34a4edcec34&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7de57a87e6746417c3e6326031cb91b3a98e1d28135059-LjdYkm_fw658',
          },
        ],
        linkDataArray: [
          { key: 2, from: 1, to: 2, color: '#ff3a46' },
          { key: 3, from: 1, to: 3, color: '#ff3a46' },
          { key: 4, from: 1, to: 4, color: '#ff3a46' },
          { key: 5, from: 3, to: 5, color: '#4f4fff' },
          { key: 6, from: 3, to: 6, color: '#4f4fff' },
          { key: 7, from: 3, to: 7, color: '#4f4fff' },
          { key: 8, from: 4, to: 8, color: '#e770ff' },
          { key: 9, from: 4, to: 9, color: '#e770ff' },
          { key: 10, from: 4, to: 10, color: '#e770ff' },
          { key: 11, from: 5, to: 11, color: '#c9ffe0' },
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
      // 'clickCreatingTool.archetypeNodeData': { text: 'Node' },// 允许在后台双击以创建新节点
      // 允许ctrl-g调用groupselection命令
      'commandHandler.archetypeGroupData': { text: 'Group', isGroup: true, color: 'blue' },
      'commandHandler.copiesTree': false, // 对于copy命令
      'commandHandler.deletesTree': false, // 对于删除命令
      'toolManager.hoverDelay': 100, // 显示工具提示的速度
      'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom, // 鼠标滚轮缩放而不是滚动
      'draggingTool.dragsTree': false, // 拖动以进行移动和复制
      'draggingTool.isGridSnapEnabled': true,
      // layout: $(go.TreeLayout, { angle: 90, sorting: go.TreeLayout.SortingAscending }),
      'undoManager.isEnabled': false, // 启用撤消和恢复
    });

    myDiagram.nodeTemplate = $(
      go.Node,
      'Auto',
      new go.Binding('location', 'pos', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'RoundedRectangle', { width: 60, height: 60 }, new go.Binding('fill', 'color')),
      $(
        go.Picture,
        new go.Binding('width', 'width'),
        new go.Binding('height', 'height'),
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
            const linkArr = myDiagram.model.linkDataArray;
            linkArr.forEach(link => {
              if (link.key === key) {
                myDiagram.model.setDataProperty(link, 'color', '#FFF');
              }
            });
            myDiagram.model.setDataProperty(node1, 'color', '#FFF');
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
        fromSpot: go.Spot.BottomSide, // 连线冲哪段开始
        toSpot: go.Spot.TopSide, // 连线冲哪段结束
      },
      new go.Binding('points').makeTwoWay(),
      $(go.Shape, { isPanelMain: true, strokeWidth: 7 }, new go.Binding('stroke', 'color')),
      $(go.Shape, {
        isPanelMain: true,
        stroke: '#FFF',
        strokeWidth: 3,
        name: 'PIPE',
        strokeDashArray: [20, 40],
      })
    );
    loop();

    let opacity = 1;
    let down = true;
    function loop() {
      const diagram = myDiagram;
      setTimeout(() => {
        const oldskips = diagram.skipsUndoManager;
        diagram.skipsUndoManager = true;
        diagram.links.each(link => {
          const shape = link.findObject('PIPE');
          const off = shape.strokeDashOffset - 3;
          // animate (move) the stroke dash
          shape.strokeDashOffset = off <= 0 ? 60 : off;
          // animte (strobe) the opacity:
          if (down) opacity -= 0.01;
          else opacity += 0.003;
          if (opacity <= 0) {
            down = !down;
            opacity = 0;
          }
          if (opacity > 1) {
            down = !down;
            opacity = 1;
          }
          shape.opacity = opacity;
        });
        diagram.skipsUndoManager = oldskips;
        loop();
      }, 60);
    }
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
