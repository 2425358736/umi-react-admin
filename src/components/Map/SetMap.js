// 地图 点击事件
import React from 'react';
import ReactQMap from 'react-qmap';

let geocoder;
let marker = null;
class SetMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: props.lat ? props.lat : 30.53786,
      longitude: props.lng ? props.lng : 104.07265,
      bool: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ bool: true });
    }, 500);
  }

  componentWillReceiveProps = Props => {
    if (Props.specificLocation && Props.specificLocation.length > 0) {
      geocoder.getLocation(Props.specificLocation);
    }
  };

  render() {
    const that = this;
    return (
      <div>
        {this.state.bool && (
          <ReactQMap
            center={{ latitude: this.state.latitude, longitude: this.state.longitude }}
            initialOptions={{ zoomControl: true, mapTypeControl: true }}
            apiKey="7Y5BZ-7DTC3-FVN3J-3Z4X2-ROLLJ-N6B7Q"
            style={{ height: 400 }}
            getMap={(map, maps) => {
              // 标记
              marker = new maps.Marker({
                position: new maps.LatLng(that.state.latitude, that.state.longitude),
                map,
              });
              // 地图点击事件
              maps.event.addListener(map, 'click', event => {
                marker.setPosition(event.latLng);
                that.props.callback(event.latLng);
              });
              // 标记点击事件
              maps.event.addListener(marker, 'click', () => {
                console.log('标记点被点击了');
              });

              // 调用地址解析类
              geocoder = new window.qq.maps.Geocoder({
                complete: result => {
                  map.setCenter(result.detail.location);
                  marker.setPosition(result.detail.location);
                  this.props.callback(result.detail.location);
                },
              });
            }}
          />
        )}
      </div>
    );
  }
}

export default SetMap;
