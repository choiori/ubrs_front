import React, { useEffect, useState } from 'react';
import './Children.scss';
import { connect } from 'react-redux';
import { childrenChecked } from '../redux/checked/actions'; //action
import useSessionStorage from '../useSessionStorage';
import ReactTooltip from '../../node_modules/react-tooltip';
const Children = ({ childrenChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'childcheckedInputs',
    [],
  );

  useEffect(() => {
    console.log('child: ', checkedInputs);
    childrenChecked(checkedInputs);
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
        id={'유치원 및 어린이집'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '유치원 및 어린이집');
        }}
        checked={checkedInputs.includes('유치원 및 어린이집') ? true : false}
      />
      <span data-tip data-for="유치원 및 어린이집">
        유치원 및 어린이집
      </span>
      <ReactTooltip
        id="유치원 및 어린이집"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          유치원 공시자료, 전국어린이집표준데이터에서의 유치원과 어린이집
          <br />
          (2020년 교육부, 사회보장정보원 제공)
        </span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'놀이터'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '놀이터');
        }}
        checked={checkedInputs.includes('놀이터') ? true : false}
      />
      <span data-tip data-for="놀이터">
        놀이터
      </span>
      <ReactTooltip
        id="놀이터"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          전국도시공원정보표준데이터에서의 어린이공원(놀이터)
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
  childrenChecked: (checkedInputs) => childrenChecked(checkedInputs),
};
export default connect(mapStateToProps, mapDispatchToProps)(Children);
