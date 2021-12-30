import React, {useState} from "react";
import { useQuery, gql } from "@apollo/client";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './App.css';

const SPACEX_QUERY = gql`
{
  launchesPast(limit: 10) {
    id
    mission_name
    launch_date_local
    launch_site {
      site_name
      site_name_long
    }
    rocket {
      rocket_name
    }
    links {
      article_link
      video_link
    }
    ships {
      id
      name
      home_port
      image
      weight_kg
    }
  }
}
`;

export default function App() {
    const [moreInfo, setMoreInfo] = useState(false);
    const { data, loading, error } = useQuery(SPACEX_QUERY);

    if (loading) return "Loading SpaceX Launches";
    if (error) return <pre>{error.message}</pre>

    const handleMoreInfo = () => {
        setMoreInfo(true);
    }

    return (
        <div className='space_container'>
            <div className='launch_component'>
                <div className="launch_carousel carousel-wrapper">
                    <div className='header'>
                        <div className='space_logo'> </div>
                    </div>
                    <Carousel showStatus={false} >
                        {data.launchesPast.map((launch) => ( <>
                                <div key={launch.id} className='info'>
                                    <div className='left_info'>
                                        <div>
                                            <div>
                                                <div className='grey_title'> Mission</div>
                                                <div className='mission_name white_description'> {launch.mission_name} </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <div className='grey_title'> Rocket </div>

                                                    <div className='white_description'>
                                                        Rocket {launch.rocket.rocket_name}
                                                    </div>
                                                    <div className='recovered'> Recovered </div>
                                            </div>
                                        </div>
                                        <button onClick={handleMoreInfo}
                                                className='learn_button'>
                                            Learn More
                                        </button>
                                    </div>
                                    <div className='right_info'>
                                        <div className='right_info_row'>
                                            <div className='grey_title'> Launch Site </div>
                                            <div className='white_description'> {launch.launch_site.site_name} </div>
                                        </div>
                                        <div className='right_info_row'>
                                            <div className='grey_title'> Launch Date </div>
                                            <div className='white_description'> {launch.launch_date_local} </div>
                                        </div>
                                    </div>
                                    {moreInfo &&
                                    <div>
                                        {launch.links.map((info) => <div> {info.links} </div>)}
                                    </div>
                                    }
                                </div>
                                <div className='grey_title'> Rescue Ships </div>
                                <div className='ships'>
                                    {launch.ships.map((ship) => ( <>
                                        <div className='ship_card'>
                                            <div style={{backgroundImage: `url(${ship.image})`}} className='ship_image'/>
                                            <div className='ship_info'>
                                                <div className='ship_title'> {ship.name} </div>
                                                <div className='ship_description_row'>
                                                    <div className='grey_title'> Ship Port </div>
                                                    <div className='ship_description'> {ship.home_port} </div>
                                                </div>
                                                <div className='ship_description_row'>
                                                    <div className='grey_title'> Weight </div>
                                                    <div className='ship_description'> {ship.weight_kg} </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>))}
                                </div>
                            </>
                            ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
}
