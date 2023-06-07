import React, { useState } from "react";
import "./ticketForm.css";

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
    setTotalPrice(selectedQuantity * 2);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="ticket-form-overlay">
      <div className="ticket-form-container">
        <button className="close-button" onClick={handleClose}>
          X
        </button>
        {!submitted && (
          <form onSubmit={handleSubmit}>
            <h2>Buy Ticket</h2>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" value={name} onChange={handleNameChange} />
              {nameError && (
                <p className="error-text">You must fill in your name.</p>
              )}
            </div>
            <div className="form-group">
              <label>Ticket Price: €4 </label>
            </div>
            <div className="form-group">
              <label>Quantity:</label>
              <select value={quantity} onChange={handleQuantityChange}>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              {quantityError && (
                <p className="error-text">
                  You must select a quantity greater than 0.
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input type="date" value={date} onChange={handleDateChange} />
            </div>
            <div>
              <p className="total-price">Total Price: €{totalPrice}</p>
            </div>
            <button type="submit">Buy Now</button>
          </form>
        )}
        {submitted && (
          <div className="success-message">
            <h2>Congratulations!</h2>
            <p>Your ticket has been successfully bought.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketForm;
