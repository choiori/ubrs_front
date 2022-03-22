import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { facChecked } from '../redux/checked/actions'; //action
import './Facility.scss';
import useSessionStorage from '../useSessionStorage';
import ReactTooltip from '../../node_modules/react-tooltip';
const Facility = ({ facChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'faccheckedInputs',
    [],
  );

  useEffect(() => {
    console.log('fac: ', checkedInputs);
    facChecked(checkedInputs);
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
        id={'영화관'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '영화관');
        }}
        checked={checkedInputs.includes('영화관') ? true : false}
      />
      <span data-tip data-for="영화관">
        영화관
      </span>
      <ReactTooltip
        id="영화관"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          영화상영관
          <br />
          (2021년 행전안전부 제공)
        </span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'카페'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '카페');
        }}
        checked={checkedInputs.includes('카페') ? true : false}
      />
      <span data-tip data-for="카페">
        카페
      </span>
      <ReactTooltip
        id="카페"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          전국초중등학교위치표준데이터에서의 초등학교
          <br />
          (2021년 소상공인시장진흥공단 제공)
        </span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'도서관'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '도서관');
        }}
        checked={checkedInputs.includes('도서관') ? true : false}
      />
      <span data-tip data-for="도서관">
        도서관
      </span>
      <ReactTooltip
        id="도서관"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          전국도서관표준데이터에서의 도서관
          <br />
          (2021년 공공데이터포털 제공)
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
  facChecked: (checkedInputs) => facChecked(checkedInputs),
};
export default connect(mapStateToProps, mapDispatchToProps)(Facility);
