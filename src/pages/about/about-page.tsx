import React, { useState } from 'react';
import PageContainer from "../../global/components/container/page-container";
import HeaderTab from "./components/header-tab";
import { Tabs } from "./constants/about.constants";
import InformationPage from "./components/information-page";
import FeaturesPage from "./components/features-page";
import PaneContainer from "../../global/components/container/pane-container";

const AboutPage = () => {
  const [currentTab, setCurrentTab] = useState(Tabs.INFORMATION);

  return (
    <PageContainer>
      <div className="space-y-2 flex flex-col w-full h-full overflow-hidden">
        <HeaderTab currentTab={currentTab} setCurrentTab={setCurrentTab}/>
        <PaneContainer overflowY>
          {currentTab === Tabs.INFORMATION ? <InformationPage/> : <FeaturesPage/>}
        </PaneContainer>
      </div>
    </PageContainer>
  )
};

export default AboutPage;