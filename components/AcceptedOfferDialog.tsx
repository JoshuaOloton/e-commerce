import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Contact } from "lucide-react";

const AcceptedOfferDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button variant="outline" className="mt-2 hover:scale-105 transition-all cursor-pointer">
        <Contact />
        Contact Seller
      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Offer Accepted!</DialogTitle>
          <DialogDescription>
            Contact the seller to arrange payment and delivery details.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 border rounded-md bg-green-100 text-green-800">
          <p className="font-semibold">Offer Accepted!</p>
          <p className="text-sm">Contact the seller to arrange payment and delivery details.</p>
          <div className="mt-2 flex gap-4">
            <a href={`tel:+234000000000`} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Call Seller
            </a>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              Mark as Completed
            </button>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptedOfferDialog;
