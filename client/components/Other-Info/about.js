'use strict';

import React from 'react'
import {Link} from 'react-router-dom';

const baseUrl = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8080' : 'https://true-brew.herokuapp.com'

const About = () => (
    <div className='about'>
            <div className='founder-statement'>
            <h1>Founding True Brew</h1>
            <h2>Have you found yourself frustrated by the corporatization of American beer? Today, InBev and SABMiller control over 70% of the U.S. beer market, often sacrificing quality in the name of profits.  Here at True Brew, we are dedicated to honoring the spirit of craft beer by identifying breweries that are still owned and operated by their founder or by their employees, whose first and only priority is good quality beer.</h2>
        </div>
        <div className = 'mission'>
        <div className='statement'>
        <h2>Hi, my name is Elliot Broach and I have a long-standing passion for finding truly independent craft beers.  Favoring light-bodied, citra-hopped, east-coast IPAs, I have spent most of my beer drinking years enjoying crafts in upstate New York.  I created True Brew as a way for people to connect and learn more about the craft beer community.  Thank you for stopping by, and please take the time to sign up and leave a few beer reviews.</h2>
        </div>
        <div className= 'my-image'>
        <img src={baseUrl + '/websiteImages/Olive.png'}/>
        </div>
        </div>
    </div>
)

export default About;
