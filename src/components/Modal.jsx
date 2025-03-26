import React, { useState } from 'react';

const Modal = ({ isOpen, isClose, refetch }) => {
    if (!isOpen) return null;

    const [values, setValues] = useState({
        title: "",
        content: ""
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            // Logique de création à intégrer ici...
            setValues({ title: "", content: "" });
            refetch();
            isClose();
        } catch (err) {
            console.error("Erreur lors de la création de l'article:", err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 p-4 z-50">
            <div className="manette p-6 rounded-lg shadow-lg w-full max-w-md relative animate-fadeIn text-white">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-extrabold">Message</span>
                    <button onClick={isClose} className="text-white hover:text-red-400">✖</button>
                </div>

                <form onSubmit={handleCreate} className="flex flex-col gap-2">
                    <label htmlFor="email" className='font-semibold'>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.title}
                        onChange={handleChange}
                        className="bg-transparent border-b-2 border-gray-300 p-2 rounded-md outline-none text-white placeholder:text-gray-300"
                        placeholder="Entrez votre email"
                        required
                    />

                    <label htmlFor="content" className="font-semibold mt-2">Contenu</label>
                    <textarea
                        id="content"
                        name="content"
                        value={values.content}
                        onChange={handleChange}
                        className="bg-transparent border-b-2 border-gray-300 p-2 rounded-md outline-none text-white placeholder:text-gray-300"
                        placeholder="Écrivez votre message..."
                        rows="4"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-white text-black font-semibold rounded-md mt-3 p-2 hover:bg-gray-200 transition duration-200"
                    >
                        Envoyer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
