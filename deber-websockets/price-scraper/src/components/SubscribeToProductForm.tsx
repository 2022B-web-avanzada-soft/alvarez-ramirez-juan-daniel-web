// Form that lets you edit or create a product

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export interface ProductSubscriptionProps {
  id: String;
}

interface ProductFormProps {
  onSubmit: (product: ProductSubscriptionProps) => void;
}

export const SubscribeToProductForm = ({ onSubmit }: ProductFormProps) => {
  const router = useRouter();
  const [id, setId] = useState("");

  return (
    <div>
      <h1>Subscribe to a product</h1>
      <form>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            onSubmit({ id });
          }}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};
