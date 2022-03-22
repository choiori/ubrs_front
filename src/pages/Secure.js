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
      여성안심지킴이집
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
