import React from "react";
import { Link } from 'react-router-dom';
import * as l from './LandingPage.module.css'

export default function LandingPage() {
    return(
        <div className={l.container}>
            <div className={l['land']}>
                <div>
                    <Link className={l.link} to='/home'>
                    <button className={l['butn']}>
                    Home
                    </button>
                    </Link>
                </div>
            </div>

        </div>
    )
}