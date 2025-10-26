import React from 'react';
import { UsersIcon } from '../components/icons/UsersIcon';
import { LeafIcon } from '../components/icons/LeafIcon';
import { GlobeIcon } from '../components/icons/GlobeIcon';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-green-800 mb-4">Our Mission</h1>
        <p className="text-xl text-brand-brown-800 max-w-3xl mx-auto">
          To build a global ecosystem where every piece of bio-waste is seen as a valuable resource, fostering innovation for a circular and sustainable economy.
        </p>
      </div>

      <div className="space-y-12 text-lg text-brand-brown-900 leading-relaxed">
        <section className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 bg-brand-green-100 p-5 rounded-full">
                <UsersIcon className="h-12 w-12 text-brand-green-700"/>
            </div>
            <div>
                <h2 className="text-2xl font-semibold text-brand-green-900 mb-3">Who We Are</h2>
                <p>
                    Waste2Worth was founded by a team of environmental scientists, software engineers, and sustainability advocates who believe in the power of technology to solve critical environmental challenges. We were frustrated by the linear "take-make-dispose" model and saw a massive, untapped opportunity in the world's bio-waste streams. Our platform is the result of that vision: a digital bridge connecting waste with worth.
                </p>
            </div>
        </section>

        <section className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="flex-shrink-0 bg-brand-green-100 p-5 rounded-full">
                <LeafIcon className="h-12 w-12 text-brand-green-700"/>
            </div>
            <div>
                <h2 className="text-2xl font-semibold text-brand-green-900 mb-3">What We Do</h2>
                <p>
                    We provide a robust, user-friendly platform that facilitates the exchange of bio-waste materials. For <strong className="text-brand-green-800">Waste Providers</strong>—from local cafes to large agricultural operations—we offer a simple way to list their byproducts, reducing disposal costs and creating new revenue streams. For <strong className="text-brand-green-800">Researchers and Innovators</strong>, we provide a searchable, verified database of raw materials for projects ranging from biofuel development and bioplastics to organic fertilizers and novel materials.
                </p>
            </div>
        </section>

        <section className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 bg-brand-green-100 p-5 rounded-full">
                <GlobeIcon className="h-12 w-12 text-brand-green-700"/>
            </div>
            <div>
                <h2 className="text-2xl font-semibold text-brand-green-900 mb-3">Our Vision for the Future</h2>
                <p>
                    We envision a future where landfills are obsolete and the concept of "waste" is redefined. By creating transparent and efficient markets for secondary materials, we aim to accelerate the transition to a circular economy. We believe that by connecting the right people with the right resources, we can unlock a new wave of green innovation that benefits both the planet and the economy. Join us in turning today's waste into tomorrow's solutions.
                </p>
            </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;