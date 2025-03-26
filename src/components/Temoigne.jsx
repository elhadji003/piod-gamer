import React from "react";

const Temoigne = () => {
    const testimonials = [
        {
            name: "John Doe",
            text: "Cette plateforme est incroyable ! J'ai beaucoup appris.",
            photo: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
            name: "Jane Smith",
            text: "Les cours sont très bien structurés et faciles à suivre.",
            photo: "https://randomuser.me/api/portraits/women/2.jpg"
        },
        {
            name: "Alice Johnson",
            text: "J'ai pu améliorer mes compétences grâce à cette plateforme.",
            photo: "https://randomuser.me/api/portraits/women/3.jpg"
        },
        {
            name: "Michael Brown",
            text: "Franchement c'est top. Je recommande à 100%.",
            photo: "https://randomuser.me/api/portraits/men/4.jpg"
        },
        {
            name: "Emily Davis",
            text: "Une super expérience d'apprentissage en ligne !",
            photo: "https://randomuser.me/api/portraits/women/5.jpg"
        }
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-8 text-pink-500">Témoignages</h2>

            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-6 animate-slide">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="min-w-[250px] sm:min-w-[300px] border border-pink-500 shadow-lg rounded-lg p-6 flex flex-col items-center text-center bg-gray-800"
                        >
                            <img
                                src={testimonial.photo}
                                alt={`${testimonial.name}'s photo`}
                                className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-pink-500"
                            />
                            <p className="text-white italic mb-4">"{testimonial.text}"</p>
                            <h3 className="text-pink-500 font-bold">{testimonial.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Temoigne;
