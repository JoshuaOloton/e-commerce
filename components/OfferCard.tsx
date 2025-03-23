import axios from "axios";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Check, X, XCircle, CheckCircle } from "lucide-react";
import { OfferType } from "@/types";
import { toast } from "sonner";
import { useState } from "react";

import React from 'react'

type Props = {
  offer: OfferType;
  updateOffers: (offers: OfferType[]) => void;
  offers: OfferType[]
}

const OfferCard = ({ offer, updateOffers, offers }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateOfferStatus = async (offerId: string, status: string) => {
    try {
      const response = await axios.patch(`/api/offers/${offerId}`, { status });
      setLoading(true);

      if (response.status === 200) {
        updateOffers(
          offers.map((offer) => {
            if (status === 'accepted') {
              return offer._id === offerId ? { ...offer, status } : { ...offer, status: 'rejected' }
            } else {
              return offer._id === offerId ? { ...offer, status } : offer
            }
          })
        );

        if (status === 'accepted')
          toast.success("Offer accepted.");
        else if (status === 'rejected')
          toast.info("Offer has been rejected.");
      }
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("An error occurred while updating offer");
      }
    }
    finally {
      setLoading(false);
    }
  };

  const renderOfferOptions = (offer: OfferType, status: string) => {
    switch (status) {
      case "pending":
        return (
          <div className="mt-2 mr-2 flex gap-2">
            <Button
              className="cursor-pointer bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
              onClick={() => updateOfferStatus(offer._id, "accepted")}
              disabled={loading}
              >
              <Check />
            </Button>
            <Button
              className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              onClick={() => updateOfferStatus(offer._id, "rejected")}
              disabled={loading}
            >
              <X />
            </Button>
          </div>
        );
      case "accepted":
        return (
          <div className="text-green-500 flex gap-1">
            <CheckCircle />
            <p>Accepted</p>
          </div>
        );
      case "rejected":
        return (
          <div className="text-red-500 flex gap-1">
            <XCircle />
            <p>Rejected</p>
          </div>
        );
      default:
        return <p className="text-gray-500">Unknown</p>;
    }
  };

  return (
    <div
      key={offer._id}
      className="border-b py-2 flex justify-between items-center"
    >
      <div className="mt-2 flex flex-col gap-2">
        <p className="font-medium">{offer.buyer.name}</p>
        <p className="text-sm text-gray-500">
          Offered <span className="font-semibold">₦{offer.price}</span>{" "}
          {/* for {product.name} */}
        </p>
      </div>
      {/* <p>{offer.status}</p> */}
      <div className="mt-2 mr-2 flex gap-2">
        { renderOfferOptions(offer, offer.status) }
      </div>
    </div>
  );
};

export default OfferCard;
