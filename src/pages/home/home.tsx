import React from 'react';
import InfoCard from "../../global/components/cards/info-card";

const Home = () => {
  const billTrackDescription = [
    "Create, edit, and view bills",
    "Set reminders for recurring bills",
    "Keep records of all transactions"
  ]

  return (
    <div className="flex flex-wrap gap-x-20 gap-y-10 pt-12 justify-center h-full">
      <InfoCard title="Bill Tracking" description={billTrackDescription} path="/bill-tracker"/>
      <InfoCard title="Other"/>
      <InfoCard title="Third"/>
    </div>
  );
};

export default Home;