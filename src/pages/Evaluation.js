import React, { useState } from 'react';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
//import { set } from '../../node_modules/immer/dist/internal';
import './Evaluation.scss';
import { useEffect } from 'react';
import API from '../API';
import FeedbackPopup from './FeedbackPopup';
import FeedbackContent from './FeedbackContent';

const Evaluation = (/*feedback,*/ props /*ResultForSession*/) => {
  const ResultForSession = sessionStorage.getItem('ResultForSession');
  const resultForSession = props.ResultForSession;
  const userID = resultForSession[0]['userID'];
  const requestTime = resultForSession[1];
  const currentUrl = window.location.href + `result/${userID}/${requestTime}`;
  const [assess, setAssess] = useState(null);
  const [feedbackNo, setfeedbackNo] = useState(props.feedback);
  const [alarm, setAlarm] = useState(false);
  const Rate1 = sessionStorage.getItem('Rate1');
  const Rate2 = sessionStorage.getItem('Rate2');
  const Rate3 = sessionStorage.getItem('Rate3');
  const mapforShare = sessionStorage.getItem('mapforShare');

  const [dongName, setDongName] = useState(props.dongName);

  const [showPopup, setshowPopup] = useState(false);
  const togglePopup = () => {
    setshowPopup(true);
  };
  const closePopup = () => {
    setshowPopup(false);
  };

  const submitAssess = async (tmp) => {
    await API.post(`/api/assess/${userID}/${requestTime}`, {
      resultForSession: resultForSession,
      feedbackNo: feedbackNo,
      mapforShare: mapforShare,
      assess: tmp,
      Rate1: Rate1,
      Rate2: Rate2,
      Rate3: Rate3,
    })
      .then(() => {
        console.log(currentUrl);
      })
      .then(() => {
        setAlarm(true);
        setAssess(tmp);
        if (alarm === true && assess === 'good') {
          alert('서버로 전송되었습니다!👍');
          setAlarm(false);
        }
        if (alarm === true && assess === 'bad') {
          alert('서버로 전송되었습니다!👎');
          setAlarm(false);
        }
      });
  };

  return (
    <div className="Evaluation">
      &nbsp;&nbsp;&nbsp;추천 결과에 만족하셨나요?
      <div
        className="likes"
        style={{ display: 'inline-block', float: 'right' }}
      >
        <button
          id="love"
          style={{ background: 'none', border: 'none' }}
          onClick={() => {
            togglePopup();
            submitAssess('good');
            //alert('서버로 전송되었습니다!👍');
          }}
        >
          <MdThumbUp size="20" color="#009000" />
          &nbsp;&nbsp;
        </button>
        {showPopup && (
          <FeedbackPopup
            visible={showPopup}
            closable={true}
            maskClosable={true}
            onClose={closePopup}
          >
            <FeedbackContent
              feedbackNo={feedbackNo}
              userID={userID}
              requestTime={requestTime}
              dongName={dongName}
            />
          </FeedbackPopup>
        )}
        <button
          id="hate"
          style={{ background: 'none', border: 'none' }}
          onClick={() => {
            togglePopup();
            submitAssess('bad');
            //alert('서버로 전송되었습니다!👎');
          }}
        >
          <MdThumbDown size="20" color="#009000" />
        </button>
        {showPopup && (
          <FeedbackPopup
            visible={showPopup}
            closable={true}
            maskClosable={true}
            onClose={closePopup}
          >
            <FeedbackContent
              feedbackNo={feedbackNo}
              userID={userID}
              requestTime={requestTime}
              dongName={dongName}
            />
          </FeedbackPopup>
        )}
      </div>
    </div>
  );
};

export default Evaluation;
