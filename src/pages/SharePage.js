import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ResultPage.scss';
import LocationforShare from './LocationforShare';
import DetailsforShare from './DetailsforShare';

const SharePage = () => {
  const [showLocation, setShowLocation] = useState(false);
  const [mapforShare, setmapforShare] = useState([]);

  return (
    <div className="ResultPage">
      <div className="main-title">
        <Link to="/">Ubrs</Link>
      </div>
      <hr />
      <div className="back">
        <Link to="/recommendation">← 다시 설정</Link>
      </div>

      {showLocation ? <LocationforShare mapforShare={mapforShare} /> : null}
      <DetailsforShare
        setShowLocation={setShowLocation}
        setmapforShare={setmapforShare}
      />
      <br />
      <br />
    </div>
  );
};

export default SharePage;
