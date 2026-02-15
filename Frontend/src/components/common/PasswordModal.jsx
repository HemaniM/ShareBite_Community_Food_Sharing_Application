import React, { useState } from "react";

const PasswordInput = ({ label, show, setShow, value, setValue }) => {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-[#5f5d56] mb-2">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-[34px] rounded-[5px] border border-[#eceade] bg-[#f5f5ee] px-3 pr-10 text-[11px]"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {show ? (
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="#7d7d77"
              strokeWidth="2"
            >
              <path d="M1 9s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6" />
              <circle cx="9" cy="9" r="3" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="#7d7d77"
              strokeWidth="2"
            >
              <path d="M17 17L1 1" />
              <path d="M1 9s3-6 8-6 8 6 8 6" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

const PasswordModal = ({ isOpen, onClose }) => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  // validation
  const isValid =
    oldPassword &&
    newPassword &&
    confirmPassword &&
    newPassword === confirmPassword;

  // ⭐ clear function
  const clearFields = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setShowOld(false);
    setShowNew(false);
    setShowConfirm(false);
  };

  // close handler
  const handleClose = () => {
    clearFields();
    onClose();
  };

  // change password handler
  const handleChangePassword = () => {
    // call API here if needed

    clearFields();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] backdrop-blur-[2px] px-4">
      <div className="relative w-full max-w-[420px] rounded-[8px] bg-white px-7 py-8 shadow-[0_12px_45px_rgba(0,0,0,0.18)]">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-[#7d7d77] hover:text-black"
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 4L14 14" />
            <path d="M14 4L4 14" />
          </svg>
        </button>

        <h2 className="text-center text-[12px] font-semibold tracking-[0.5px] text-[#47453f]">
          CHANGE PASSWORD
        </h2>

        <div className="mt-6 space-y-4">
          <PasswordInput
            label="Old Password"
            show={showOld}
            setShow={setShowOld}
            value={oldPassword}
            setValue={setOldPassword}
          />

          <PasswordInput
            label="New Password"
            show={showNew}
            setShow={setShowNew}
            value={newPassword}
            setValue={setNewPassword}
          />

          <PasswordInput
            label="Confirm Password"
            show={showConfirm}
            setShow={setShowConfirm}
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleChangePassword}
            disabled={!isValid}
            className={`px-8 py-2 rounded-[8px] text-white text-[10px] font-bold tracking-[0.6px]
              
              ${
                isValid
                  ? "bg-[#efa13d] hover:opacity-90 cursor-pointer"
                  : "bg-[#efa13d]/40 cursor-not-allowed"
              }
              
            `}
          >
            CHANGE PASSWORD
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
