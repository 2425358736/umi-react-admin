/**
 * @author vivivan
 * @date 2019/7/6 10:17
 * @Description:流程图实例
 */

import React from "react";
import {Button,Row,message} from "antd";
import BasicGojs from '../../../components/V_GojsCustom/BasicGojs';
import styles from './index.less';

class GojsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            model:{
                // 初始节点数据
                nodeDataArray: [
                    { key: 'Alpha', label: 'Alpha', color: 'lightblue' },
                    { key: 'Beta', label: 'Beta', color: 'orange' },
                    { key: 'Gamma', label: 'Gamma', color: 'lightgreen' },
                    { key: 'Delta', label: 'Delta', color: 'pink' },
                ],
                // 初始连接线 from 初始 key 到 截至key
                linkDataArray: [
                    { from: 'Alpha', to: 'Beta' },
                    { from: 'Alpha', to: 'Gamma' },
                    { from: 'Beta', to: 'Delta' },
                ]
            }
        };
    }

    /* 渲染流程图 */
    initView = () => {
        const renderData = {
            model: {
                // 手动设置数据
                nodeDataArray: [
                    { key: 'Alpha', label: 'Alpha', color: 'lightblue' },
                    { key: 'Beta', label: 'Beta', color: 'orange' },
                    { key: 'Gamma', label: 'Gamma', color: 'lightgreen' },
                    { key: 'Delta', label: 'Delta', color: 'pink' },
                    { key: 'Omega', label: 'Omega', color: 'grey' }
                ],
                // 设置连接线 from 初始 key 到 截至key
                linkDataArray: [
                    { from: 'Alpha', to: 'Beta' },
                    { from: 'Alpha', to: 'Gamma' },
                    { from: 'Beta', to: 'Delta' },
                    { from: 'Gamma', to: 'Omega' }
                ]
            }
        };
        this.child.renderModalHandler({renderData});
    };

    /* 给选中节点增加子节点 如果未选择节点，则在根节点添加 ; 如果传参，以传参为准 */
    addNode = () => {
        this.child.addNodeHandler();
    };

    /* 给指定节点增加子节点 */
    addAlphaChild = () => {
        this.child.addNodeHandler(['Alpha']);
    }

    /* 获取选中节点 */
    getSelectedKeys = () => {
        const keys = this.child.getSelectedKeys();
        message.success(`你选择的是${keys}节点`);
    };

    deleteNode = () => {
        this.child.removeNodeHandler();
    }

    /* 更新节点颜色 */
    changeNodeColor =() => {
        this.child.updateColorHandler();
    }

    render(){
        return (
          <div className="gutter-example" style={{width:'100%;', height:'100%',padding:'30px'}}>
            <Row gutter={16} style={{background:'#fff',margin:'0px',padding:"10px 30px",textAlign:"center"}}>
              <Button type="info" className="act-btn" onClick={this.initView}>初始化流程图</Button>
              <Button type="primary" className="act-btn" onClick={this.addNode}>给选中节点增加子节点</Button>
              <Button type="primary" className="act-btn" onClick={this.addAlphaChild}>给Alpha增加子节点</Button>
              <Button type="danger" className="act-btn" onClick={this.deleteNode}>删除节点</Button>
              <Button type="info" className="act-btn" onClick={this.getSelectedKeys}>获取选中节点</Button>
              <Button type="primary" className="act-btn" onClick={this.changeNodeColor}>更新节点颜色</Button>
            </Row>
            <BasicGojs
              className={styles.myGojs}
              onRef={(ref)=>{this.child=ref;}}
              diagramId="myDiagramDom"
              model={this.state.model}
              createDiagram={this.createDiagram}
              style={{width:"100%",height:"100%"}}
            />
          </div>
        );
    }
}

export default GojsPage;
