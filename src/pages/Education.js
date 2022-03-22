import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { eduChecked } from '../redux/checked/actions'; //action
import './Education.scss';
import useSessionStorage from '../useSessionStorage';
import ReactTooltip from '../../node_modules/react-tooltip';

const Education = ({ eduChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'educheckedInputs',
    [],
  );
  useEffect(() => {
    console.log('제발찍혀라', checkedInputs);
    eduChecked(checkedInputs);
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
        id={'초등학교'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '초등학교');
        }}
        checked={checkedInputs.includes('초등학교') ? true : false}
      />
      <span data-tip data-for="초등학교">
        초등학교
      </span>
      <ReactTooltip
        id="초등학교"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          전국초중등학교위치표준데이터에서의 초등학교
          <br />
          (2021년 한국교원대학교 제공)
        </span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'중학교'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '중학교');
        }}
        checked={checkedInputs.includes('중학교') ? true : false}
      />
      <span data-tip data-for="중학교">
        중학교
      </span>
      <ReactTooltip
        id="중학교"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          전국초중등학교위치표준데이터에서의 중학교
          <br />
          (2021년 한국교원대학교 제공)
        </span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'고등학교'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '고등학교');
        }}
        checked={checkedInputs.includes('고등학교') ? true : false}
      />
      <span data-tip data-for="고등학교">
        고등학교
      </span>
      <ReactTooltip
        id="고등학교"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          전국초중등학교위치표준데이터에서의 고등학교
          <br />
          (2021년 한국교원대학교 제공)
        </span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'학원'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '학원');
        }}
        checked={checkedInputs.includes('학원') ? true : false}
      />
      <span data-tip data-for="학원">
        학원
      </span>
      <ReactTooltip
        id="학원"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          학원교습소정보
          <br />
          (2020년 한국교육학술정보원 제공)
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
  eduChecked: (checkedInputs) => eduChecked(checkedInputs),
};
export default connect(mapStateToProps, mapDispatchToProps)(Education);
