import React from 'react';
import reactIcon from '../../../assets/icons/react-icon.png';
import tailwindIcon from '../../../assets/icons/tailwind-icon.png';
import supabaseIcon from '../../../assets/icons/supabase.png';
import postgresIcon from '../../../assets/icons/postgre.png';
import googleIcon from '../../../assets/images/google-transparent.png';
import typescriptIcon from '../../../assets/icons/typescript.png';
import userTableImage from '../../../assets/features_images/database-user.png';
import debtTableImage from '../../../assets/features_images/database-debt.png';
import archiveTableImage from '../../../assets/features_images/database-archive.png';
import Divider from "../../../global/components/divider/divider";

const ListItem = ({ img, width = 50, text }: { img: string, width?: number, text: string }) => {
  return (
    <span className="flex items-center space-x-2">
      <img src={img} width={width}/>
      <p>{text}</p>
    </span>
  )
}

const InformationPage = () => {
  return (
    <div className="flex flex-col space-y-10">

      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <p className="font-medium text-lg">Front-End Technologies:</p>
        <ListItem img={reactIcon} text="React 18"/>
        <ListItem img={typescriptIcon} text="Typescript"/>
        <ListItem img={tailwindIcon} text="Tailwind CSS"/>
      </div>

      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-4">
        <p className="font-medium text-lg">Back-End Technologies:</p>
        <ListItem img={supabaseIcon} text="Supabase"/>
        <ListItem img={postgresIcon} text="PostgreSQL"/>
        <ListItem img={googleIcon} text="Google OAuth 2.0"/>
      </div>

      <Divider/>

      <p className="font-medium text-lg">Database:</p>
      <div className="flex flex-col space-y-2">
        <img src={userTableImage} width={200} className="border border-2 border-emerald-800"/>
        <img src={debtTableImage} width={200} className="border border-2 border-emerald-800"/>
        <img src={archiveTableImage} width={200} className="border border-2 border-emerald-800"/>
      </div>

    </div>
  )
};

export default InformationPage;