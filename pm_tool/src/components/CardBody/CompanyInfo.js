import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
function CompanyInfo({stockData,nameToDomainData}) {

    const [companyInfo, setCompanyInfo] = useState({})

    useEffect(()=>{
        setCompanyInfo({...companyInfo, ...stockData})
    }, [stockData])

    return (
        <div className="companyInfo">
            <div className='flex items-center justify-between mb-6'>
                <div className="companyInfoText">
                    <h1>{companyInfo['Name']}</h1>
                    <p>{companyInfo['Sector']}</p>
                    {/* <a href={`https://${nameToDomainData['domain']}`} target='_blank' rel='noreferrer'>{nameToDomainData['domain']}</a> */}
                </div>
                <img src={nameToDomainData.logo} alt=""/>
            </div>
            <div className="companyInfoDescription">
                <p>{companyInfo['Description']}</p>
            </div>
            <div>
                <Link className="seeAll">See all</Link>
            </div>
        </div>
    );
}

export default CompanyInfo;