import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { healChecked } from '../redux/checked/actions';
import './Health.scss';
import useSessionStorage from '../useSessionStorage';
import ReactTooltip from '../../node_modules/react-tooltip';
const Health = ({ healChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'healcheckedInputs',
    [],
  );
  useEffect(() => {
    console.log('health: ', checkedInputs);
    healChecked(checkedInputs);
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
        id={'헬스장'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '헬스장');
        }}
        checked={checkedInputs.includes('헬스장') ? true : false}
      />
      <span data-tip data-for="헬스장">
        헬스장
      </span>
      <ReactTooltip
        id="헬스장"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          상가(상권)정보에서의 헬스장
          <br />
          (2021년 소상공인시장진흥공단 제공)
        </span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'수영장'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '수영장');
        }}
        checked={checkedInputs.includes('수영장') ? true : false}
      />
      <span data-tip data-for="수영장">
        수영장
      </span>
      <ReactTooltip
        id="수영장"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          수영장업
          <br />
          (2021년 행정안전부 제공)
        </span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'체육관'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '체육관');
        }}
        checked={checkedInputs.includes('체육관') ? true : false}
      />
      <span data-tip data-for="체육관">
        체육관
      </span>
      <ReactTooltip
        id="체육관"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          전국공공시설개방정보표준데이터의 체육관
          <br />
          (2021년 공공데이터포털 제공)
        </span>
      </ReactTooltip>
      {console.log(checkedInputs)}
      <br />
      <br />
      <input
        id={'공원'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '공원');
        }}
        checked={checkedInputs.includes('공원') ? true : false}
      />
      <span data-tip data-for="공원">
        공원
      </span>
      <ReactTooltip
        id="공원"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          전국도시공원정보표준데이터에서의 공원
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
    checked: state.checked.checked, //{checked} -> 그냥 checked로 사용가능
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addChecked: () => dispatch(addChecked()), //앞에꺼는 같은 이름
//   };
// };
const mapDispatchToProps = {
  //간결
  healChecked: (checkedInputs) => healChecked(checkedInputs), //이 다음 넘긴 것을 action에서 처리
};
export default connect(mapStateToProps, mapDispatchToProps)(Health); //redux와 연결
