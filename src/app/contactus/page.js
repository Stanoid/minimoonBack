'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import InputEl from '../comps/inputel';

// Mocking 't' function based on the Arabic text in the image
const t = (key) => {
    const translations = {
        contactUs: 'تواصل معنا',
        phone: 'الهاتف',
        mainBranch: 'الفرع الرئيسي والإدارة',
        email: 'الإيميل',
        phoneValue: '+1234567890',
        locationValue: 'SILVER LAKE, United State 1941 Late Avenue',
        emailValue: 'hello@company.com',
        sendUsMessage: 'راسلنا مباشرة بمشكلتك أو اقتراحك، وسنرد عليك في أسرع وقت ممكن.',
        name: 'الاسم *',
        namePlaceholder: 'اسماك ثنائي على الأقل',
        emailField: 'البريد الإلكتروني *',
        emailPlaceholder: 'example@example.com',
        phoneNumber: 'رقم الهاتف *',
        message: 'رسالتك',
        messagePlaceholder: 'تفاصيل العنوان لتسهيل عملية التوصيل - مثل اسم شارع ورقم البناية بجوار علامة مميزة',
        send: 'إرسال',
    };
    return translations[key] || key;
};

function AccounteEl({ direction = 'ltr', locale = 'en' }) {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <section className="w-full py-16 bg-white" dir={direction}>
            <div className="max-w-7xl flex justify-center items-center flex-col mx-auto px-4 sm:px-6 lg:px-8 text-center">

                <h2 className="text-3xl font-bold text-gray-800 mb-12">
                    {t('contactUs')}
                </h2>

                {/* --- Contact Info Blocks ---
                * Uses grid-cols-1/3 for full space centered look.
                * Circles are smaller (w-14 h-14).
                */}
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid md:grid-cols-3 w-full justify-items-center  mb-16 gap-8">

                    {/* Phone Block */}
                    <div className="flex flex-col  items-center justify-start w-full  lg:mx-12 sm:w-auto">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 mb-3">
                            <Phone className="w-7 h-7 text-moon-200" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{t('phone')}</h3>
                        <p className="text-gray-600 text-base">{t('phoneValue')}</p>
                    </div>

                    {/* Location Block (Center Item in Grid) */}
                    <div className="flex flex-col items-center justify-start w-full max-w-[250px] sm:w-auto border-y sm:border-x sm:border-y-0 py-4 sm:py-0 border-gray-200">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 mb-3">
                            <MapPin className="w-7 h-7 text-moon-200" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center">{t('mainBranch')}</h3>
                        <p className="text-gray-600 text-base text-center max-w-[250px]">{t('locationValue')}</p>
                    </div>

                    {/* Email Block */}
                    <div className="flex flex-col items-center justify-start w-full max-w-[250px] sm:w-auto">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 mb-3">
                            <Mail className="w-7 h-7 text-moon-200" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{t('email')}</h3>
                        <p className="text-gray-600 text-base">{t('emailValue')}</p>
                    </div>

                </div>

                {/* --- Contact Form --- */}
                <div className="w-full text-right max-w-xl">
                    <p className="text-gray-700 mb-6 text-sm md:text-base">
                        {t('sendUsMessage')}
                    </p>

                    <form className="space-y-6">

                        {/* Name Input using InputEl */}
                        <InputEl
                            label={t('name')}
                            value={formData.name}
                            outputfunc={(val) => handleChange('name', val)}
                            placeholder={t('namePlaceholder')}
                            type="text"
                        />

                        {/* Email Input using InputEl */}
                        <InputEl
                            label={t('emailField')}
                            value={formData.email}
                            outputfunc={(val) => handleChange('email', val)}
                            type="email" // Explicitly set type to email
                            placeholder={t('emailPlaceholder')}
                        />

                        {/* Phone Number Input (Kept custom due to country code/dropdown structure) */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('phoneNumber')}
                            </label>
                            <div className="flex rounded-md shadow-sm">
                                {/* Country Code Dropdown/Flag area (Visual Match) */}
                                <span className="inline-flex items-center px-3 py-3 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 sm:text-sm order-2">
                                    {/* Placeholder for Flag */}
                                    <span className="mr-1">🇺🇸</span>
                                    +1
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </span>
                                {/* Phone Number Input Field */}
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    placeholder="123 456 7890"
                                    className="flex-1 block w-full px-4 py-3 border border-gray-300 rounded-l-md focus:ring-moon-200 focus:border-moon-200 text-left placeholder-gray-400 order-1"
                                    required
                                />
                            </div>
                        </div>


                        {/* Message/Address Input (Kept custom as a textarea) */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('message')}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={(e) => handleChange('message', e.target.value)}
                                placeholder={t('messagePlaceholder')}
                                // Note: Using the standard styling for the textarea to match the visual of the input
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-moon-200 focus:border-moon-200 text-right placeholder-gray-400 resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center pt-2">
                            <button
                                type="submit"
                                className="w-full px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-moon-200  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-moon-200 transition duration-150 ease-in-out"
                            >
                                {t('send')}
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </section>
    );
}

export default AccounteEl;
