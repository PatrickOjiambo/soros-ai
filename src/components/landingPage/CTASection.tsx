import React from 'react';

const CTASection = () => {
    return (
        <section className=" pt-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Ready to Transform Your Trading?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Be the first to know when we launch and get early access.
                </p>

                <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap">
                        Join Waitlist
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTASection;