import React,{useState,useEffect} from 'react';

function CompanyInfo({stockData,nameToDomainData}) {

    const [companyInfo, setCompanyInfo] = useState({})

    useEffect(()=>{
        setCompanyInfo({...companyInfo, ...stockData})
    }, [stockData])

    return (
        <div className="companyInfo">
            <div className='flex items-center mb-4'>
                <img src={nameToDomainData.logo} alt=""/>
                <div>
                    <p>{companyInfo['Sector']}</p>
                    <h1>{companyInfo['Name']}</h1>
                    <a href={`https://${nameToDomainData['domain']}`} target='_blank' rel='noreferrer'>{nameToDomainData['domain']}</a>
                </div>
            </div>
            <div className="companyInfoDescription">
                <p>{companyInfo['Description']}</p>
            </div>
            <div>
                <h2>People think {nameToDomainData.name} is</h2>
            </div>
        </div>
    );
}

export default CompanyInfo;