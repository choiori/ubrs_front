import React, { useEffect } from 'react';
import { useState } from 'react';

const { kakao } = window;

const LocationforShare = (props) => {
  const [location, setlocation] = useState();
  const [splitLocation, setsplitLocation] = useState([
    '37.5465770572176',
    '126.96458430932942',
  ]);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    try {
      console.log('전달받음?? ', props.mapforShare);
      console.log('props.mapforShare: ', props.mapforShare[0]);
      console.log('props.mapforShare: ', props.mapforShare[1]).then(() => {
        setlocation(props.mapforShare[0]);
        setsplitLocation(location['location'].split(','));
        setTempLoc1(props.mapforShare[1]);
        setTempLoc2(props.mapforShare[2]);
        setTempLoc3(props.mapforShare[3]);
      });
      console.log('location', location);
    } catch {}

    setShowMap(true);
    //setShowMap(false);
    //console.log('바뀐뒤 :', tempLoc1);
  }, []);
  useEffect(() => {
    console.log(location);
    setTempLoc1(props.mapforShare[1]);
    setTempLoc2(props.mapforShare[2]);
    setTempLoc3(props.mapforShare[3]);
  }, [splitLocation]);

  const [tempLoc1, setTempLoc1] = useState(['임시이름', 37.476796, 127.100387]); //추천결과임시좌표
  const [tempLoc2, setTempLoc2] = useState(['임시이름', 37.539123, 127.143163]);
  const [tempLoc3, setTempLoc3] = useState(['임시이름', 37.566092, 126.830395]);

  useEffect(() => {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.5465770572176, 126.96458430932942),
      level: 10,
    };

    var map = new kakao.maps.Map(container, options);
    var imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    var imageSize = new kakao.maps.Size(24, 35);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    //직장 임시 좌표값
    var workPosition = new kakao.maps.LatLng(
      splitLocation[0],
      splitLocation[1],
    );
    var workMarker = new kakao.maps.Marker({
      position: workPosition,
      image: markerImage,
    });
    var infowindow = new kakao.maps.InfoWindow({
      content:
        '<div style="width: 150px;text-align:center;padding:1px;fontSize: 10px;">나의 직장</div>',
    });
    infowindow.open(map, workMarker);
    map.setCenter(workPosition);

    workMarker.setMap(map);

    //추천 결과 장소 임시 좌표값
    var positions = [
      {
        address: tempLoc1[0],
        latlng: new kakao.maps.LatLng(tempLoc1[1], tempLoc1[2]),
      },
      {
        address: tempLoc2[0],
        latlng: new kakao.maps.LatLng(tempLoc2[1], tempLoc2[2]),
      },
      {
        address: tempLoc3[0],
        latlng: new kakao.maps.LatLng(tempLoc3[1], tempLoc3[2]),
      },
    ];

    for (var i = 0; i < positions.length; i++) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: positions[i].latlng,
        title: positions[i].address,
      });
    }
  }, [tempLoc1, tempLoc2, tempLoc3]);

  return (
    <div
      id="map"
      style={{
        width: '1000px',
        height: '400px',
        marginLeft: '10%',
        marginTop: '1%',
        marginRight: '10%',
      }}
    ></div>
  );
};

export default LocationforShare;
