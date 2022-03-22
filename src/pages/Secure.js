import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { secureChecked } from '../redux/checked/actions'; //action
import useSessionStorage from '../useSessionStorage';
import ReactTooltip from '../../node_modules/react-tooltip';
const Secure = ({ secureChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'securecheckedInputs',
    [],
  );
  useEffect(() => {
    console.log('secure: ', checkedInputs);
    secureChecked(checkedInputs);
  }, [checkedInputs, setCheckedInputs]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  };

  return (
    <div className="LifeStyleDetails" style={{ fontSize: '10px' }}>
      <input
        id={'범죄안전등급'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '범죄안전등급');
        }}
        checked={checkedInputs.includes('범죄안전등급') ? true : false}
      />
      <span data-tip data-for="범죄안전등급">
        범죄안전등급
      </span>
      <ReactTooltip
        id="범죄안전등급"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          행정안전부에서 제공한 2021년 지역안전등급
          <br />
          (1등급일수록 상대적으로 안전)
        </span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'경찰관서'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '경찰관서');
        }}
        checked={checkedInputs.includes('경찰관서') ? true : false}
      />
      <span data-tip data-for="경찰관서">
        경찰관서
      </span>
      <ReactTooltip
        id="경찰관서"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>경찰청에서 제공한 지역경찰청별 지구대, 파출소</span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'여성안심지킴이집'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '여성안심지킴이집');
        }}
        checked={checkedInputs.includes('여성안심지킴이집') ? true : false}
      />
      <span data-tip data-for="여성안심지킴이집">
        여성안심지킴이집
      </span>
      <ReactTooltip
        id="여성안심지킴이집"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          위급한 상황에 처한 여성들의 긴급 대피와 안전한 귀가를 지원
          <br />
          (주로 24시간 운영 편의점 지정)
          <br />
          전국여성안심지킴이표준데이터에서의 여성안심지킴이집
          <br />
          (2022년 공공데이터포털 제공)
        </span>
      </ReactTooltip>
      {console.log(checkedInputs)}
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state, 'state');
  return {
    checked: state.checked.checked,
  };
};

const mapDispatchToProps = {
  secureChecked: (checkedInputs) => secureChecked(checkedInputs),
};
export default connect(mapStateToProps, mapDispatchToProps)(Secure);
