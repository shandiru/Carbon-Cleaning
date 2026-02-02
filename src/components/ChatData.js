// ChatData.js
export const FAQ_DATA = [
  // Basic greetings and info
  { keywords: ['hello', 'hi', 'hey'], response: 'Hello! How can I assist you today? 😊' },
  { keywords: ['hours', 'open', 'timing'], response: 'Mon-Fri: 9:00 AM - 5:00 PM\nSat: 9:00 AM - 2:00 PM\nSun: Closed' },
  { keywords: ['location', 'address', 'where', 'mobile'], response: 'We are mobile! We serve a 20-mile radius around Nottingham NG5 5TD.' },
  { keywords: ['price', 'cost', 'how much'], response: '• Carbon Clean: £80\n• 360 Clean: £100\n• Engine Detox: £130\n• DPF Clean: £300' },
  { keywords: ['book', 'appointment'], response: 'Call us at 07752 549740 to secure your slot!' },
  { keywords: ['thank', 'thanks'], response: 'You\'re welcome! Drive safe. 🚗' },
  
  // Technical FAQ - Carbon Cleaning
  { 
    keywords: ['carbon clean fix', 'will carbon clean fix', 'fix my car'], 
    response: '🔧 A carbon clean may help if carbon buildup is affecting your engine, but it\'s not a guaranteed fix and cannot repair mechanical or electrical faults.\n\nIt\'s a maintenance service, not a replacement for proper diagnosis.\n\n⚠️ Assessment based on info provided only. Full diagnosis can only be guaranteed once diagnostics are carried out by Nottingham Carbon Cleaning.' 
  },
  { 
    keywords: ['run better', 'improve performance', 'carbon clean help'], 
    response: '✅ Carbon cleaning can help your engine run smoother by reducing carbon buildup, which may improve throttle response and efficiency.\n\nHowever, it doesn\'t replace servicing or repairs and cannot fix mechanical/electrical faults.\n\n⚠️ Assessment based on info provided only. Full diagnosis can only be guaranteed once diagnostics are carried out by Nottingham Carbon Cleaning.' 
  },
  { 
    keywords: ['block dpf', 'carbon clean block', 'dpf blocked'], 
    response: '❌ No, a carbon clean does NOT block a DPF. The cleaning process works through combustion and doesn\'t introduce solids into the exhaust system.\n\nDPF issues are usually related to driving conditions, regeneration problems, or underlying faults.\n\n⚠️ Assessment based on info provided only. Full diagnosis can only be guaranteed once diagnostics are carried out by Nottingham Carbon Cleaning.' 
  },
  
  // DPF Related
  { 
    keywords: ['dpf warning', 'dpf light', 'new dpf', 'dpf replacement'], 
    response: '⚠️ A DPF warning light doesn\'t automatically mean you need a new DPF. Often it\'s due to incomplete regeneration caused by driving conditions.\n\nYou may need a forced regeneration or further investigation to identify underlying issues.\n\n⚠️ Assessment based on info provided only. Full diagnosis can only be guaranteed once diagnostics are carried out by Nottingham Carbon Cleaning.' 
  },
  
  // EGR Related
  { 
    keywords: ['egr fault', 'egr code', 'egr clean fix', 'egr error'], 
    response: '🔍 EGR fault codes can be caused by carbon buildup restricting valve movement, but also by electrical faults, sensors, or failed actuators.\n\nAn EGR clean may help if carbon is the issue, but it cannot repair electrical or mechanical failures.\n\n⚠️ Assessment based on info provided only. Full diagnosis can only be guaranteed once diagnostics are carried out by Nottingham Carbon Cleaning.' 
  },
  
  // Electrical/Sensor Issues
  { 
    keywords: ['sensor fault', 'electrical issue', 'fix sensor', 'ecu problem'], 
    response: '❌ Carbon cleaning and fuel treatments cannot repair sensors, wiring faults, electrical issues, or ECU problems.\n\nThese faults require proper testing, diagnosis, and repair.\n\n⚠️ Assessment based on info provided only. Full diagnosis can only be guaranteed once diagnostics are carried out by Nottingham Carbon Cleaning.' 
  },
  
  // Third-party recommendations
  { 
    keywords: ['garage said', 'mechanic said', 'told me', 'recommended carbon clean'], 
    response: '🤔 Third-party advice alone doesn\'t confirm that carbon cleaning is the correct solution.\n\nCarbon buildup can contribute to certain symptoms, but other faults can produce similar warnings. A proper diagnostic assessment is required.\n\n⚠️ Assessment based on info provided only. Full diagnosis can only be guaranteed once diagnostics are carried out by Nottingham Carbon Cleaning.' 
  },
  
  // Service vs Carbon Clean
  { 
    keywords: ['carbon clean service', 'same as service', 'replace service'], 
    response: '❌ No, a carbon clean is NOT a replacement for servicing.\n\nIt\'s a maintenance process that may reduce carbon buildup and support smoother running, but doesn\'t replace oil changes, filters, or mechanical servicing.\n\n⚠️ Assessment based on info provided only. Full diagnosis can only be guaranteed once diagnostics are carried out by Nottingham Carbon Cleaning.' 
  },
  
  // Diagnosis
  { 
    keywords: ['diagnose', 'fault code diagnosis', 'code only', 'read codes'], 
    response: '⚠️ Fault codes are indicators only and do NOT confirm the cause of a fault on their own.\n\nA full and accurate diagnosis can only be guaranteed once diagnostics are carried out directly on the vehicle.\n\n⚠️ Assessment based on info provided only. Full diagnosis can only be guaranteed once diagnostics are carried out by Nottingham Carbon Cleaning.' 
  },
  
  // Guarantee questions
  { 
    keywords: ['guaranteed', 'guarantee work', 'will it work', 'success rate'], 
    response: '⚠️ Carbon cleaning is NOT a guaranteed fix.\n\nIt may help where carbon buildup is contributing to symptoms, but cannot resolve faults caused by mechanical wear, electrical issues, or failed components.\n\n⚠️ Assessment based on info provided only. Full diagnosis can only be guaranteed once diagnostics are carried out by Nottingham Carbon Cleaning.' 
  },
  { 
    keywords: ['offer guarantee', 'warranty', 'money back'], 
    response: 'Carbon cleaning services are maintenance-based and results can vary depending on vehicle condition and underlying faults.\n\nA full diagnosis is the only way to confirm fault causes and required repairs.\n\n⚠️ Assessment based on info provided only. Full diagnosis can only be guaranteed once diagnostics are carried out by Nottingham Carbon Cleaning.' 
  },
  
  // Assistant purpose
  { 
    keywords: ['what is this', 'purpose', 'what can you do', 'assistant purpose'], 
    response: '🤖 This assistant provides guidance on whether carbon-cleaning services may be suitable based on the information you provide.\n\n❌ I cannot:\n• Diagnose faults\n• Book appointments\n• Guarantee outcomes\n\n✅ For proper diagnosis and booking, please contact Nottingham Carbon Cleaning directly.' 
  }
];

export const QUICK_REPLIES = [
  // Basic Info (4)
  'Services & Prices',
  'Book Appointment',
  'Opening Hours',
  'Coverage Area',
  
  // Technical FAQ (12)
  'Will carbon clean fix my car?',
  'Does carbon clean help run better?',
  'Can carbon clean block DPF?',
  'DPF warning light - need new DPF?',
  'EGR fault code - will clean fix?',
  'Fix sensor/electrical issues?',
  'Garage recommended - is it right?',
  'Is carbon clean same as service?',
  'Diagnose from fault codes?',
  'Is carbon cleaning guaranteed?',
  'Do you offer guarantee?',
  'What is this assistant?'
];

export const BRAND_COLORS = {
  primary: '#B62025',
  hover: '#8f1a1e',
  textRed: 'text-[#B62025] dark:text-[#FF4B4B]'
};