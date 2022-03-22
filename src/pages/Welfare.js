import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { welChecked } from '../redux/checked/actions'; //action
import './Welfare.scss';
import useSessionStorage from '../useSessionStorage';
import ReactTooltip from '../../node_modules/react-tooltip';
const Welfare = ({ welChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'welcheckedInputs',
    [],
  );
  useEffect(() => {
    console.log('health: ', checkedInputs);
    welChecked(checkedInputs);
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
        id={'경로당'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '경로당');
        }}
        checked={checkedInputs.includes('경로당') ? true : false}
      />
      <span data-tip data-for="경로당">
        경로당
      </span>
      <ReactTooltip
        id="경로당"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          각 시도별에서 제공한 경로당(노인여가복지시설)
          <br />
          (2021년,2020년 제공)
        </span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'사회복지관'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '사회복지관');
        }}
        checked={checkedInputs.includes('사회복지관') ? true : false}
      />
      <span data-tip data-for="사회복지관">
        사회복지관
      </span>
      <ReactTooltip
        id="사회복지관"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          각 시도별에서 제공한 사회복지관, 사회복지시설
          <br />
          (2021년 제공)
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
  welChecked: (checkedInputs) => welChecked(checkedInputs),
};
export default connect(mapStateToProps, mapDispatchToProps)(Welfare);
