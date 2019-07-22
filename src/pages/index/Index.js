import React from 'react';
import ReactQMap from 'react-qmap';
import { Drawer } from 'antd';
import Detail from './components/Details';

import jz from '@/assets/jz.jpeg';
import styles from './index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: {
        latitude: 39.91474,
        longitude: 116.37333,
      },
      equipmentList: [],
      bool: false,
      visible: false,
      id: 0,
    };
  }

  componentDidMount() {
    // 获取设备位置
    this.setState({
      equipmentList: [
        {
          equipmentName: 'a设备',
          id: 1,
          lat: 39.91474,
          lon: 116.37333,
        },
        {
          equipmentName: 'b设备',
          id: 2,
          lat: 40.91474,
          lon: 116.37333,
        },
        {
          equipmentName: 'c设备',
          id: 3,
          lat: 41.91474,
          lon: 116.37333,
        },
        {
          equipmentName: 'd设备',
          id: 4,
          lat: 42.91474,
          lon: 116.37333,
        },
        {
          equipmentName: 'e设备',
          id: 5,
          lat: 42.91474,
          lon: 117.37333,
        },
      ],
    });

    setTimeout(() => {
      this.setState({ bool: true });
    }, 500);
  }

  render() {
    const { currentLocation, bool, equipmentList, id, visible } = this.state;
    const that = this;
    return (
      <div className={styles.sysUserWrap}>
        <div className={styles.baseTableWrap}>
          <div>
            {bool && (
              <ReactQMap
                center={currentLocation}
                initialOptions={{ zoomControl: true, mapTypeControl: true, zoom: 1 }}
                apiKey="7Y5BZ-7DTC3-FVN3J-3Z4X2-ROLLJ-N6B7Q"
                style={{ height: 'calc(100vh - 152px)' }}
                getMap={(map, maps) => {
                  // ============================================ 获取当前ip的位置
                  const citylocation = new maps.CityService({
                    complete(result) {
                      map.setCenter(result.detail.latLng);
                    },
                  });
                  citylocation.searchLocalCity();
                  // ===================================================

                  // ============================================ 创建Marker点
                  const { MVCArray } = maps;
                  const markers = new MVCArray(); // 存放Marker数组
                  const icon = new maps.MarkerImage(jz);
                  equipmentList.forEach(obj => {
                    const marker = new maps.Marker({
                      icon,
                      position: new maps.LatLng(obj.lat, obj.lon),
                      obj,
                      map,
                    });
                    markers.push(marker);
                    maps.event.addListener(marker, 'click', () => {
                      that.setState({
                        visible: true,
                        id: obj.id,
                      });
                    });
                  });
                  // ===================================================

                  // ============================================点聚合
                  const { MarkerCluster } = maps;

                  const markerClusterer = new MarkerCluster({
                    map,
                    minimumClusterSize: 2, // 默认2
                    markers,
                    zoomOnClick: true, // 默认为true
                    gridSize: 30, // 默认60
                    averageCenter: true, // 默认false
                    maxZoom: 18, // 默认18
                  });
                  const Event = maps.event;
                  Event.addListener(markerClusterer, 'clusterclick', evt => {
                    console.log('点击了聚合点');
                    console.log(evt);
                  });
                  // ========================================================
                }}
              />
            )}
          </div>
          <Drawer
            getContainer="main"
            className={styles.breadDom}
            maskStyle={{
              position: 'absolute',
              height: 'calc(100vh - 112px)',
              overflow: 'auto',
            }}
            zIndex={0}
            title="设备信息"
            placement="right"
            width="1000px"
            visible={visible}
            onClose={() => {
              this.setState({
                visible: false,
                id: 0,
              });
            }}
            destroyOnClose
          >
            <Detail id={id} />
          </Drawer>
        </div>
      </div>
    );
  }
}

export default Index;
