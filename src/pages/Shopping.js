import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { shopChecked } from '../redux/checked/actions'; //action
import './Shopping.scss';
import useSessionStorage from '../useSessionStorage';
import ReactTooltip from '../../node_modules/react-tooltip';
const Shopping = ({ shopChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'shopcheckedInputs',
    [],
  );
  useEffect(() => {
    console.log('health: ', checkedInputs);
    shopChecked(checkedInputs);
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
        id={'백화점'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '백화점');
        }}
        checked={checkedInputs.includes('백화점') ? true : false}
      />
      <span data-tip data-for="백화점">
        백화점
      </span>
      <ReactTooltip
        id="백화점"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          행정안전부에서 제공한 대규모점포 데이터중 백화점
          <br />
          (2021년 제공)
        </span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'대형마트'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '대형마트');
        }}
        checked={checkedInputs.includes('대형마트') ? true : false}
      />
      <span data-tip data-for="대형마트">
        대형마트
      </span>
      <ReactTooltip
        id="대형마트"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          행정안전부에서 제공한 대규모점포 데이터중 대형마트
          <br />
          (2021년 제공)
        </span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'복합쇼핑센터'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '복합쇼핑센터');
        }}
        checked={checkedInputs.includes('복합쇼핑센터') ? true : false}
      />
      <span data-tip data-for="복합쇼핑센터">
        복합쇼핑센터
      </span>
      <ReactTooltip
        id="복합쇼핑센터"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          행정안전부에서 제공한 대규모점포 데이터중 쇼핑센터, 복합쇼핑몰
          <br />
          (2021년 제공)
        </span>
      </ReactTooltip>
      <br />
      <br />
      <input
        id={'시장'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '시장');
        }}
        checked={checkedInputs.includes('시장') ? true : false}
      />
      <span data-tip data-for="시장">
        시장
      </span>
      <ReactTooltip
        id="시장"
        type="light"
        backgroundColor="#b2e7b2"
        place="left"
      >
        <span>
          행정안전부에서 제공한 대규모점포 데이터중 시장
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
  shopChecked: (checkedInputs) => shopChecked(checkedInputs),
};
export default connect(mapStateToProps, mapDispatchToProps)(Shopping);
