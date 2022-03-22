import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { natureChecked } from '../redux/checked/actions'; //action
import useSessionStorage from '../useSessionStorage';
import ReactTooltip from '../../node_modules/react-tooltip';
const Nature = ({ natureChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'naturecheckedInputs',
    [],
  );
  useEffect(() => {
    console.log('nature: ', checkedInputs);
    natureChecked(checkedInputs);
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
        id={'등산로'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '등산로');
        }}
        checked={checkedInputs.includes('등산로') ? true : false}
      />
      <span data-tip data-for="등산로">
        등산로
      </span>
      <ReactTooltip
        id="등산로"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>산림청에서 제공한 전국 등산로</span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'산책로'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '산책로');
        }}
        checked={checkedInputs.includes('산책로') ? true : false}
      />
      <span data-tip data-for="산책로">
        산책로
      </span>
      <ReactTooltip
        id="산책로"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          국토교통부에서 제공한 제주올레길, 지리산둘레길, 동해안해파랑길 등
          전국의 유명한 13개의 둘레길 및 올레길
        </span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'미세먼지'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '미세먼지');
        }}
        checked={checkedInputs.includes('미세먼지') ? true : false}
      />
      <span data-tip data-for="미세먼지">
        미세먼지
      </span>
      <ReactTooltip
        id="미세먼지"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>2020년 지역별 미세먼지(PM10) 통계</span>
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
  natureChecked: (checkedInputs) => natureChecked(checkedInputs),
};
export default connect(mapStateToProps, mapDispatchToProps)(Nature);
