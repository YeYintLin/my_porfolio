import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about">
        <div className="row">
            <div className="col-md-6 col-xl-6 col-lg-6 col-xs-12 about-img">
                <img
                    src="https://cdn.download.ams.birds.cornell.edu/api/v2/asset/612763581/900" 
                    alt="profile_pic" 
                />
            </div>
            <div className="col-md-6 about-content">
                <h1>About me</h1>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quisquam nemo incidunt suscipit eum totam omnis fugiat sed,
                    excepturi inventore similique, tenetur adipisci vel harum 
                    nostrum iusto consequuntur amet quam numquam! Consequuntur 
                    vero aliquid maxime reprehenderit dignissimos nulla aliquam. 
                    Ea quidem impedit ab non quasi, facere voluptas dignissimos dolorum. 
                    Quibusdam doloremque voluptate voluptates illum et debitis repellat at, 
                    aperiam ex obcaecati tempora quia quis veritatis, alias quasi blanditiis 
                    nihil iusto fugit asperiores quaerat repudiandae vitae a ullam? 
                    Deleniti sequi ut sed cupiditate expedita repudiandae adipisci reprehenderit aliquam voluptates.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.                                        
                </p>
            </div>
        </div>
    </div>
  )
}

export default About