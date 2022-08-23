import * as card from "./Card.module.css";
import React, { Component } from "react"; //Importing Component to use ClassComponents

// Rendering with class components method
export default class Card extends Component {

    render() {
        return(
            <div className={card['countryContainer']}>
                <section>
                    <img className={card['imgContainer']} src={this.props.flag} alt="img not found" width='80px' height='60px' />
                    <h3>{this.props.name}</h3>
                    <h3>{this.props.continents}</h3>
                </section>
            </div>
        );
    };
};

// Example of a functional component

// export default function Card({flag, name, continents}) {
//     return (
//         <div>
//             <img src={flag} alt="img not found" width='50px' height='50px' />
//             <h3>{name}</h3>
//             <h3>{continents}</h5>
//         </div>
//     );
// };


