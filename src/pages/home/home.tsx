import React, { useEffect, useState } from 'react';
import PageCard from "../../global/components/cards/page-cards/page-card";
import billIcon from '../../assets/images/bill-icon.png';
import investmentIcon from '../../assets/images/invest-icon.png'
import DevToggleButton from "./components/dev-toggle-button";
import { DevFeaturesKey } from "../../global/constants/local-storage.constants";
import DevCard from "../../global/components/cards/page-cards/dev-card";
import PageContainer from "../../global/components/container/page-container";

const Home = () => {
  const [devFeatures, setDevFeatures] = useState<boolean>(false);

  useEffect(() => {
    const localStorageDevFeatures: string | null = localStorage.getItem(DevFeaturesKey);
    if (localStorageDevFeatures === null) {
      localStorage.setItem(DevFeaturesKey, `${devFeatures}`);
      setDevFeatures(false);
    } else {
      setDevFeatures(JSON.parse(localStorageDevFeatures));
    }
  }, [])

  const billTrackDescription = [
    "Create, edit, and view bills",
    "Set reminders for recurring bills",
    "Keep records of all transactions",
    "Send to friends, request from enemies"
  ];

  const investmentDescription = [
    "Track initial investments",
    "Calculate future savings",
    "Lose money"
  ];

  return (
    <PageContainer>
      <div className="flex flex-col h-max w-full pb-4">
        <DevToggleButton devFeatures={devFeatures} setDevFeatures={setDevFeatures}/>

        <div className="flex flex-wrap gap-x-20 gap-y-10 justify-center mt-6 h-full">
          <PageCard title="Bill Tracking" description={billTrackDescription} image={billIcon} path="/bill-tracker"/>
          <PageCard title="Investment Tracking" description={investmentDescription} image={investmentIcon}/>

          {devFeatures && <DevCard/>}
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;