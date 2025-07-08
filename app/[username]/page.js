"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { initatePayment, getuserdetails, fetchpayments } from '@/actions/useractions';
import { toast } from 'sonner';
import Script from 'next/script';

const Username = ({ params }) => {

  const { data: session } = useSession();
  const router = useRouter();
    const unwrappedParams = React.use(params);
  const { username } = unwrappedParams;

  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: 0
  });

  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        const user = await getuserdetails(username);
        if (user) {
          setCurrentUser(user);
          const allPayments = await fetchpayments(username);
          setPayments(allPayments);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    document.title = `${username} Page - Get Me A Chai`;
  }, [username]);

  useEffect(() => {
    if (!session) router.push("/login");
  }, [session, router]);

  const handleChange = (e) => {
    setPaymentform({
      ...paymentform,
      [e.target.id]: e.target.value
    });
  };

  const handlePay = async () => {
    const { name, message, amount } = paymentform;
    if (!name || !message || !amount) {
      toast.error('Please fill all fields!', {
        description: "All fields are required to proceed with the payment.",
      });
      return;
    }

    try {
      const orderId = await initatePayment(amount, username, paymentform, session?.user?.img);
      if (orderId) {
        const options = {
          key: currentUser.razorpayKey,
          amount: amount * 100,
          currency: "INR",
          name: "GetMeAChai",
          description: `Payment for ${username}`,
          order_id: orderId,
          handler: async function (response) {
            const res = await fetch("/api/razorpay", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const data = await res.json();
            if (data.success) {
              const updatedPayments = await fetchpayments(username);
              setPayments(updatedPayments);
              toast.success("Payment successful!", {
                description: "Thank you for your support!",
              });
            } else {
              toast.error("Payment failed!", {
                description: "Could not verify payment. Please try again.",
              });
            }
          },
          theme: { color: "#64748b" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.on("payment.failed", function () {
          toast.error("Payment failed!", {
            description: "There was an error processing your payment.",
          });
        });
        razorpay.open();
      }
    } catch (err) {
      console.error("Error initiating payment:", err);
      toast.error("Payment initiation failed!", {
        description: "Try again later.",
      });
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Banner */}
      <div className="relative">
        <img className="w-full h-[300px] object-cover" src={currentUser.coverPicture} alt="cover" />
        <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full">
          <img src={currentUser.profilePicture} className="w-28 h-28 rounded-full object-cover" alt="profile" />
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-20 flex flex-col items-center text-white text-center gap-2">
        <div className="font-bold text-xl">{currentUser.name}</div>
        <div className="text-sm text-gray-400">{currentUser.Bio}</div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>📦 {payments.length}+ payments</span>
          <span>•</span>
          <span>💰 ₹{payments.reduce((a, b) => a + b.amount, 0)} raised</span>
        </div>
      </div>

      {/* Payment Section */}
      <div className="flex flex-col md:flex-row gap-6 w-[90%] max-w-[1000px] mx-auto mt-10">
        {/* Supporters */}
        <div className="bg-slate-900 text-white p-6 rounded-lg w-full md:w-1/2 flex flex-col">
          <h3 className="text-center text-xl font-bold mb-2">Top 5 Supporters</h3>
          <ul className="overflow-y-auto flex-1 text-sm text-slate-400 pr-2 space-y-3">
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <li key={index} className="flex gap-3">
                  <img src="donation.jpeg" alt="donor" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <span className="font-medium text-white">{payment.from_user}</span> donated 
                    <span className="font-bold text-green-400"> ₹{payment.amount}</span> with 📝
                    <div>“{payment.message}”</div>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-500">No supporters yet</li>
            )}
          </ul>
        </div>

        {/* Payment Form */}
        <div className="bg-slate-900 text-white p-6 rounded-lg w-full md:w-1/2 flex flex-col">
          <h3 className="text-center text-xl font-bold mb-4">Make a Payment</h3>
          <label className="text-sm text-gray-400">Enter Your Name</label>
          <input id="name" value={paymentform.name} onChange={handleChange} className="bg-slate-800 p-2 mb-2 rounded" />

          <label className="text-sm text-gray-400">Enter a Message</label>
          <input id="message" value={paymentform.message} onChange={handleChange} className="bg-slate-800 p-2 mb-2 rounded" />

          <label className="text-sm text-gray-400">Enter Amount</label>
          <input type="number" id="amount" value={paymentform.amount} onChange={handleChange} className="bg-slate-800 p-2 mb-4 rounded" />

          <button onClick={handlePay} className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl py-2 rounded-lg font-medium text-sm">
            Pay
          </button>

          <div className="flex flex-wrap gap-2 mt-4">
            {[500, 1000, 2000, 5000].map((amt) => (
              <button key={amt} onClick={() => setPaymentform({ ...paymentform, amount: amt })} className="bg-slate-800 p-2 rounded">
                ₹{amt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Username;
