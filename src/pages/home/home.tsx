import React from 'react';
import InfoCard from "../../global/components/cards/info-card";
import billIcon from '../../assets/images/bill-icon.png';

const Home = () => {
  const billTrackDescription = [
    "Create, edit, and view bills",
    "Set reminders for recurring bills",
    "Keep records of all transactions"
  ]

  return (
    <div className="flex flex-wrap gap-x-20 gap-y-10 justify-center">
      <InfoCard title="Bill Tracking" description={billTrackDescription} image={billIcon} path="/bill-tracker"/>
      <InfoCard title="Investment Tracking" image=""/>
      <InfoCard title="Third" image=""/>
    </div>
  );
};

export default Home;