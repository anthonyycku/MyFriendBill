import React from 'react';
import InfoCard from "../../global/components/cards/info-card";
import billIcon from '../../assets/images/bill-icon.png';
import investmentIcon from '../../assets/images/investment-tracking-icon copy.png'

const Home = () => {
  const billTrackDescription = [
    "Create, edit, and view bills",
    "Set reminders for recurring bills",
    "Keep records of all transactions"
  ];

  const investmentDescription = [
    "Track initial investments",
    "Calculate future savings"
  ];

  return (
    <div className="flex flex-wrap gap-x-20 gap-y-10 justify-center pt-10">
      <InfoCard title="Bill Tracking" description={billTrackDescription} image={billIcon} path="/bill-tracker"/>
      <InfoCard title="Investment Tracking" description={investmentDescription} image={investmentIcon}/>
      <InfoCard title="Third" image=""/>
    </div>
  );
};

export default Home;