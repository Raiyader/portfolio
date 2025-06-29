import { useState } from "react";
import InboxModal from "./InboxModal";

const Inbox = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  return (
    <>
      <InboxModal show={showDemoModal} onClose={() => setShowDemoModal(false)} />
      <div className="bg-purple-100 p-4 rounded flex flex-col justify-between items-start font-medium">
        <div>
          <p className="font-semibold text-abyssalternative">Welcome to the Demo Experience!</p>
          <p className="text-sm text-neutral-600">This is a demo version of Abyssal Shopping designed to simulate a real e-commerce experience.</p>
        </div>
        <button
          onClick={() => setShowDemoModal(true)}
          className="text-md text-purple-600 underline mt-2 hover:text-purple-500 cursor-pointer"
        >
          Read More
        </button>
      </div>
    </>
  );
}

export default Inbox;
