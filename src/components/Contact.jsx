import React from "react";

const Contact = () => {
  return (
    <div className="py-5 flex flex-col justify-between items-center mx-40 my-10 h-full rounded-2xl shadow-xl">
      <p className="text-4xl font-bold py-5">Contact Us</p>
      <p className="text-lg font-medium mb-5">Need to get in touch with us? Fill out the form with your enquiry.</p>
      <div className="flex flex-col gap-5 justify-start">
        <div className="flex flex-row gap-10 justify-between">
          <div>
            <p className="text-base font-semibold">
              First Name<sup>*</sup>
            </p>
            <input className="bg-slate-200 w-48 h-12 rounded-lg" type="text" />
          </div>
          <div>
            <p className="text-base font-semibold">
              Last Name<sup>*</sup>
            </p>
            <input className="bg-slate-200 w-48 h-12 rounded-lg" type="text" />
          </div>
        </div>
        <div>
          <p className="text-base font-semibold">
            Email<sup>*</sup>
          </p>
          <input className="bg-slate-200 w-full h-12 rounded-lg" type="text" />
        </div>
        <div>
          <p className="text-base font-semibold">
            Message<sup>*</sup>
          </p>
          <textarea className="bg-slate-200 w-full h-56 rounded-lg" type="text" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
