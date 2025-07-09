"use client"
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CTASection = () => {
    const [email, setEmail] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Close the dialog after submission
        setIsDialogOpen(false);
        // Reset the email field
        setEmail('');
    };

    return (
        <section className="pt-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Ready to Transform Your Trading?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Be the first to know when we launch and get early access.
                </p>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap">
                            Join Waitlist
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700">
                        <DialogHeader>
                            <DialogTitle className="text-white">Join Our Waitlist</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                            <div className="grid items-center gap-2">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Your email address"
                                    className="bg-gray-700 border-gray-600 text-white"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="bg-green-500 hover:bg-green-600">
                                Submit
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
};

export default CTASection;