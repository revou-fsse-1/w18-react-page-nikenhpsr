import React, { useState } from "react";

type TicketFormProps = {
  onClose: () => void;
};

const TicketForm: React.FC<TicketFormProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState("");
  const [nameError, setNameError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset errors
    setNameError(false);
    setQuantityError(false);

    // Perform validation
    if (name.trim() === "") {
      setNameError(true);
    }
    if (quantity === 0) {
      setQuantityError(true);
    }

    // If all fields are valid
    if (name.trim() !== "" && quantity > 0) {
      // Perform form submission logic
      setSubmitted(true);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedQuantity = parseInt(e.target.value);
    setQuantity(selectedQuantity);
    setTotalPrice(selectedQuantity * 3.75);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <button className="close-button" onClick={handleClose}>
          X
        </button>
        {!submitted && (
          <form onSubmit={handleSubmit}>
            <h4 className="mb-4 font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl">Buy Your Way to See The Finest Art on Earth!</h4>
            <div className="mb-4">
              <label className="block">Name:</label>
              <input type="text" value={name} onChange={handleNameChange} className="w-full text-center border border-gray-600 rounded" />
              {nameError && (
                <p className="text-red-500 mt-0 mb-0">You must fill in your name.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block">Date:</label>
              <input type="date" value={date} onChange={handleDateChange} className="w-full text-center border border-gray-600 rounded" />
            </div>
            <div className="mb-4">
              <label className="block">Quantity:</label>
              <select value={quantity} onChange={handleQuantityChange} className="w-full text-center border border-gray-600 rounded">
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              {quantityError && (
                <p className="text-red-500 mt-0 mb-0">
                  You must select a quantity greater than 0.
                </p>
              )}
            </div>
            <div>
              <p className="font-bold">Total Price: €{totalPrice}</p>
            </div>
            <button type="submit" className="mt-4 border border-gray-600 rounded">Buy Now</button>
          </form>
        )}
        {submitted && (
          <div className="text-center">
            <h2 className="mb-4 font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl">Congratulations!</h2>
            <p>Your ticket has been successfully bought.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketForm;
