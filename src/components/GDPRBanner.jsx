import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function GDPRConsent() {
  const [visible, setVisible] = useState(false);
  const [accepted, setAccepted] = useState(null);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("gdprConsent");
    if (consent === "true" || consent === "false") {
      setAccepted(consent === "true");
      setShowIcon(true);
    } else {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("gdprConsent", "true");
    setAccepted(true);
    setVisible(false);
    setShowIcon(true);
  };

  const handleReject = () => {
    localStorage.setItem("gdprConsent", "false");
    setAccepted(false);
    setVisible(false);
    setShowIcon(true);
  };

  const handleIconClick = () => {
    setVisible(true);
    setShowIcon(false);
  };

  return (
    <>
      {/* Cookie Consent Banner */}
      {visible && (
        /* Changed 'right-6' to 'left-6' and applied 'bg-black' */
        <div className="fixed bottom-6 left-6 max-w-xs p-5 rounded-lg bg-black text-[#C0C0C0] z-50 shadow-lg border border-gray-700 backdrop-blur-sm">
          <p className="text-sm mb-4 leading-relaxed text-center">
            We use cookies to improve your experience.{" "}
            <Link
              to="/privacy-policy"
              className="underline font-semibold text-[#C0C0C0] hover:text-[#B62025] dark:hover:text-[#FF4B4B] transition-colors"
            >
              See our Privacy Policy
            </Link>
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleReject}
              className="px-5 py-2 rounded-md bg-gray-700 text-white text-sm hover:bg-[#B62025] dark:hover:bg-[#FF4B4B] transition uppercase tracking-wider font-medium"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2 rounded-md text-sm text-white bg-[#B62025] dark:bg-[#FF4B4B] hover:opacity-90 transition uppercase tracking-wider font-medium"
            >
              Accept
            </button>
          </div>
        </div>
      )}

      {/* Cookie Icon */}
      {showIcon && !visible && (
        /* Changed 'right-6' to 'left-6' and applied brand red */
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={handleIconClick}
            className="w-10 h-10 rounded-full bg-[#B62025] dark:bg-[#FF4B4B] shadow-lg border border-white flex items-center justify-center hover:scale-105 transition cursor-pointer"
            title="Cookie Preferences"
          >
            <img
              src="/revisit.svg"
              alt="Cookie Icon"
              className="w-5 h-5 object-contain invert"
            />
          </button>
        </div>
      )}
    </>
  );
}