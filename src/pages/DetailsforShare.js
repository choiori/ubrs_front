import React, { useEffect, useState, Fragment } from 'react';
import './Detail.scss';
import Popup from './Popup';

import ContentsforShare from './ContentsforShare';
import API from '../API';
import useSessionStorage from '../useSessionStorage';

const DetailsforShare = (props) => {
  // const [resultShare, setResultShare] = useSessionStorage('resultShare', []);
  //const [result, setResult] = useState(resultShare[(3, 5)]);
  const [resultShare, setResultShare] = useSessionStorage('resultShare', []);
  const [ashowPopup, setaShowPopup] = useState(false);
  const atogglePopup = () => {
    setaShowPopup(true);
  };
  const closeaPopup = () => {
    setaShowPopup(false);
  };

  const [bshowPopup, setbShowPopup] = useState(false);
  const btogglePopup = () => {
    setbShowPopup(true);
  };
  const closebPopup = () => {
    setbShowPopup(false);
  };

  const [cshowPopup, setcShowPopup] = useState(false);
  const ctogglePopup = () => {
    setcShowPopup(true);
  };
  const closecPopup = () => {
    setcShowPopup(false);
  };

  const [Result1List, setResultList1] = useState([]);
  const [Result2List, setResultList2] = useState([]);
  const [Result3List, setResultList3] = useState([]);
  const [Price1, setPrice1] = useState('');
  const [Price2, setPrice2] = useState('');
  const [Price3, setPrice3] = useState('');

  const [List1, setList1] = useState([]);
  const [List2, setList2] = useState([]);
  const [List3, setList3] = useState([]);

  const [Result1, setResult1] = useState([]);
  const [Result2, setResult2] = useState([]);
  const [Result3, setResult3] = useState([]);

  const [Rate1, setRate1] = useState([]);
  const [Rate2, setRate2] = useState([]);
  const [Rate3, setRate3] = useState([]);

  useEffect(() => {
    const url = window.location.pathname;
    console.log(url);
    const urlArray = url.split('/');
    setResultShare(null);
    console.log(urlArray[2]);
    console.log(urlArray[3]);

    API.post(`/api/share/${urlArray[2]}/${urlArray[3]}`, {
      userID: urlArray[2],
      requestTime: urlArray[3],
    }).then((res) => {
      // console.log('응답옴: ', res);
      console.log(res.data);
      setResultShare(resultShare);
      console.log(res.data.Rate1);
      console.log(res.data.result1);
      props.setmapforShare(JSON.parse(res.data.mapforShare));

      props.setShowLocation(true);

      const result1List = res.data.result1.split(',');
      const result2List = res.data.result2.split(',');
      const result3List = res.data.result3.split(',');
      setResultList1(result1List);
      setResultList2(result2List);
      setResultList3(result3List);
      console.log('array', result1List);
      console.log('수단', result1List[result1List.length - 1]);

      const rate1 = JSON.parse(res.data.Rate1);
      const key1 = Object.keys(rate1);
      const rate2 = JSON.parse(res.data.Rate2);
      const rate3 = JSON.parse(res.data.Rate3);
      setRate1(rate1);
      setRate2(rate2);
      setRate3(rate3);
      console.log(Object.keys(rate1));
      console.log(Object.values(rate1));
      const priceIndex1 = result1List.indexOf(key1[0]);
      const priceIndex2 = result2List.indexOf(key1[0]);
      const priceIndex3 = result3List.indexOf(key1[0]);
      console.log(result1List.indexOf(key1[0]));
      let price1 = '';
      let price2 = '';
      let price3 = '';

      for (let i = 1; i < priceIndex1; i++) {
        price1 += result1List[i];
      }
      for (let i = 1; i < priceIndex2; i++) {
        price2 += result2List[i];
      }
      for (let i = 1; i < priceIndex3; i++) {
        price3 += result3List[i];
      }
      console.log(price1);
      setPrice1(price1);
      setPrice2(price2);
      setPrice3(price3);

      const result1 = result1List.slice(priceIndex1, -2);
      const result2 = result2List.slice(priceIndex2, -2);
      const result3 = result3List.slice(priceIndex3, -2);
      setResult1(result1);
      setResult2(result2);
      setResult3(result3);
      console.log('result:', result1);

      function division(arr, n) {
        let len = arr.length;
        let cnt = Math.floor(len / n) + (Math.floor(len % n) > 0 ? 1 : 0);
        let tmp = [];

        for (let i = 0; i < cnt; i++) {
          tmp.push(arr.splice(0, n));
        }
        return tmp;
      }

      const list1 = division(result1, 2);
      const list2 = division(result2, 2);
      const list3 = division(result3, 2);
      setList1(list1);
      setList2(list2);
      setList3(list3);
    });
  }, []);

  return (
    <div className="Detail">
      <div className="d1">
        <div className="number1" style={{ display: 'inline-block' }}>
          a
        </div>
        &nbsp;&nbsp;&nbsp;{Result1List[0]}
        <br />
        <br />
        <div className="result1">
          <span className="bold1">2021년 공동주택 기준 평균 가격</span> {Price1}
          원{'     '}
          <span className="bold1">
            {Result1List[Result1List.length - 1]}
          </span>{' '}
          {Math.round(Result1List[Result1List.length - 2])}
          분
          <br />
          <Fragment>
            {List1.map((result1) => (
              <span>
                <span className="bold1">{result1[0]}</span>
                <span className="number"> {result1[1]}</span>
                {result1[0] == '범죄안전등급' ? (
                  <span>등급</span>
                ) : result1[0] == '미세먼지' ? (
                  <span>㎍/m³</span>
                ) : (
                  <span>개</span>
                )}
                &nbsp;&nbsp;&nbsp;
                <span className={Rate1[result1[0]]}>
                  {Rate1[result1[0]]} &nbsp;&nbsp;
                </span>
                &nbsp;
                <br />
              </span>
            ))}
          </Fragment>
          <button className="amore" onClick={atogglePopup}>
            +더보기
          </button>
          {ashowPopup && (
            <Popup
              visible={ashowPopup}
              closable={true}
              maskClosable={true}
              onClose={closeaPopup}
            >
              <ContentsforShare
                id={'a'}
                ResultList={Result1List}
                Price={Price1}
                List={List1}
                Rate={Rate1}
              />
            </Popup>
          )}
          <br />
        </div>
        <br />
      </div>
      <div className="eval1"></div>
      <br />
      <div className="d2">
        <div className="number2" style={{ display: 'inline-block' }}>
          b
        </div>
        &nbsp;&nbsp;&nbsp;{Result2List[0]}
        <br />
        <br />
        <div className="result2">
          <span className="bold2">2021년 공동주택 기준 평균 가격</span> {Price2}
          원{'     '}
          <span className="bold2">
            {Result2List[Result2List.length - 1]}
          </span>{' '}
          {Math.round(Result2List[Result2List.length - 2])}
          분
          <br />
          <Fragment>
            {List2.map((result1) => (
              <span>
                <span className="bold2">{result1[0]}</span>
                <span className="number"> {result1[1]}</span>
                {result1[0] == '범죄안전등급' ? (
                  <span>등급</span>
                ) : result1[0] == '미세먼지' ? (
                  <span>㎍/m³</span>
                ) : (
                  <span>개</span>
                )}
                &nbsp;&nbsp;&nbsp;
                <span className={Rate2[result1[0]]}>
                  {Rate2[result1[0]]} &nbsp;&nbsp;
                </span>
                &nbsp;
                <br />
              </span>
            ))}
          </Fragment>
          <div className="bmore" onClick={btogglePopup}>
            +더보기
          </div>
          {bshowPopup && (
            <Popup
              visible={bshowPopup}
              closable={true}
              maskClosable={true}
              onClose={closebPopup}
            >
              <ContentsforShare
                id={'b'}
                ResultList={Result2List}
                Price={Price2}
                List={List2}
                Rate={Rate2}
              />
            </Popup>
          )}
          <br />
        </div>
      </div>
      <br />
      <div className="eval2"></div>
      <br />
      <div className="d3">
        <div className="number3" style={{ display: 'inline-block' }}>
          c
        </div>
        &nbsp;&nbsp;&nbsp;{Result3List[0]}
        <br />
        <br />
        <div className="result3">
          <span className="bold3">2021년 공동주택 기준 평균 가격</span> {Price3}
          원{'     '}
          <span className="bold3">
            {Result3List[Result3List.length - 1]}
          </span>{' '}
          {Math.round(Result3List[Result3List.length - 2])}
          분
          <br />
          <Fragment>
            {List3.map((result1) => (
              <span>
                <span className="bold3">{result1[0]}</span>
                <span className="number"> {result1[1]}</span>
                {result1[0] == '범죄안전등급' ? (
                  <span>등급</span>
                ) : result1[0] == '미세먼지' ? (
                  <span>㎍/m³</span>
                ) : (
                  <span>개</span>
                )}
                &nbsp;&nbsp;&nbsp;
                <span className={Rate3[result1[0]]}>
                  {Rate3[result1[0]]} &nbsp;&nbsp;
                </span>
                &nbsp;
                <br />
              </span>
            ))}
          </Fragment>
          <div className="cmore" onClick={ctogglePopup}>
            +더보기
          </div>
          {cshowPopup && (
            <Popup
              visible={cshowPopup}
              closable={true}
              maskClosable={true}
              onClose={closecPopup}
            >
              <ContentsforShare
                id={'c'}
                ResultList={Result3List}
                Price={Price3}
                List={List3}
                Rate={Rate3}
              />
            </Popup>
          )}
          <br />
        </div>
      </div>
      <br />
      <div className="eval2"></div>
      <br />
    </div>
  );
};

export default DetailsforShare;
