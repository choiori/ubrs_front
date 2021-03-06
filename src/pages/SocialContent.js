import React, { useEffect, useState } from 'react';
import './SocialContent.scss';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  LineShareButton,
  LineIcon,
} from 'react-share';
import API from '../API';

const SocialContent = () => {
  //const [currentUrl, setcurrentUrl] = useState();
  const ResultForSession = sessionStorage.getItem('ResultForSession');
  const resultForSession = JSON.parse(ResultForSession);
  const userID = resultForSession[0]['userID'];
  const requestTime = resultForSession[1];
  const currentUrl = `https://nervous-morse-0d4e14.netlify.app/share/${userID}/${requestTime}`;
  const forShare = sessionStorage.getItem('forShare');
  const mapforShare = sessionStorage.getItem('mapforShare');
  const Rate1 = sessionStorage.getItem('Rate1');
  const Rate2 = sessionStorage.getItem('Rate2');
  const Rate3 = sessionStorage.getItem('Rate3');

  useEffect(() => {
    try {
      submitSession();

      console.log(currentUrl);
    } catch (ex) {
      console.log('오류');
    }
  }, []);

  const submitSession = async () => {
    API.post(`/api/result/${userID}/${requestTime}`, {
      resultForSession: resultForSession,
      forShare: forShare,
      mapforShare: mapforShare,
      Rate1: Rate1,
      Rate2: Rate2,
      Rate3: Rate3,
    }).then(() => {
      console.log(currentUrl);
    });
  };

  return (
    <div className="SocialContent">
      <div className="title">공유하기</div>
      <br />
      <div className="description">Ubrs의 추천결과를 SNS에 공유해주세요</div>
      <br />
      <div className="share">
        <FacebookShareButton url={currentUrl} style={{ marginRight: '20px' }}>
          <FacebookIcon size={45} round={true} borderRadius={15}></FacebookIcon>
        </FacebookShareButton>
        <TwitterShareButton url={currentUrl} style={{ marginRight: '20px' }}>
          <TwitterIcon size={45} round={true} borderRadius={15}></TwitterIcon>
        </TwitterShareButton>
        <LineShareButton url={currentUrl} style={{ marginRight: '20px' }}>
          <LineIcon size={45} round={true} borderRadius={15}></LineIcon>
        </LineShareButton>
      </div>
    </div>
  );
};

export default SocialContent;
