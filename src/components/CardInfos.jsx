import { faGamepad, faUser, faUsers, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import CountUp from 'react-countup';

const CardInfos = () => {
    const infos = [
        { icon: faUsers, count: 58, title: "Utilisateurs" },
        { icon: faGamepad, count: 12, title: "Jeux" },
        { icon: faTrophy, count: 34, title: "Tournois" },
        { icon: faUser, count: 20, title: "Joueurs Actifs" }, // nouvelle donnée
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 p-6">
            {infos.map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-pink-500 rounded-lg shadow-lg p-6 text-center text-white hover:scale-105 transition-transform duration-300">
                    <FontAwesomeIcon icon={item.icon} className="text-pink-500 text-4xl mb-4" />
                    <h2 className="text-3xl font-bold"> +<CountUp end={item.count} duration={5} /></h2>
                    <p className="text-pink-400 mt-2 uppercase tracking-wide">{item.title}</p>
                </div>
            ))}
        </div>
    );
};

export default CardInfos;
