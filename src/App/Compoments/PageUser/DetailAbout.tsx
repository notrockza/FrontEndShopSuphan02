
import React from 'react'
import HeaderUser from './HeaderUser'
import useInformation from '../hooks/useInformation';
import moment from 'moment';
import { URLSever } from '../../API/util/util';

function DetailAbout() {
    const { informationDetail } = useInformation();
  return (
    <div>
        <HeaderUser/>
         <section className="project-details-area project-bg pt-120 pb-70 pt-200" >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="project-details-wrap">
                                <div className="project-details-top mb-35">
                                    <span className="date">    {moment.utc(informationDetail?.created).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss")}</span>
                                    <h2 className="title">{informationDetail?.nameinformation}<span>Crop</span></h2>
      
                                </div>
                                <div className="project-details-content">
                                    
                                   
                                    <div className="row mb-20">
                                        <div className="col-md-6">
                                            <div className="project-details-img">
                                                <img src={ URLSever + informationDetail?.image } style={{ height: "300px" }}/>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div className="project-details-img">
                                                <img src="img/images/project_details_img02.jpg" alt=""/>
                                            </div>
                                        </div>
                                    </div>

                                    <p>{informationDetail?.detaiinformation}</p>
                                    
                                    {/* <p>Auctor tellus, eu consectetur neque elit quis nunc. Cras elementum pretiumi Nullam justo efficitur, trist ligula
                                    pellentue ipsum Quisque thsr augue ipsum, vehicula tellus maximus. Was popularised in the 1960s withs the release of
                                    Letraset sheets containing Lorem Ipsum passags, and more recently with desktop publishing software.Farming dolor sit
                                    amet, consectetur adipiscing elit. Cras sollicitin, tellus vitae condimem.</p>
                                  
                                    <p>Express dolor sit amet, consectetur adipiscing elit. Cras sollicitudin, tellus vitae condimem egestlibos dolor auctor
                                    tellus, eu consectetur neque elit quis nunc. Cras elementum pretiumi Nullam justo efficitur, trist ligula pellentue
                                    ipsum Quisque thsr augue ipsum, vehicula tellus maximus. Was popularised in the 1960s withs the release of Letraset
                                    sheets containing Lorem Ipsum passags, and more recently with desktop publishing software.Farming dolor sit amet,
                                    consectetur adipiscing elit. Cras sollicitin, tellus vitae condimem egestlibers dolosr auctor tellus, eu consectetur
                                    neque elit quinunc.</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </section>
    </div>
  )
}

export default DetailAbout