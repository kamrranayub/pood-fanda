import React, { useContext, useEffect } from 'react';
import './verify.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const localToken = localStorage.getItem("token");
            const response = await axios.post(
                url + "/api/order/verify",
                { success, orderId },
                { headers: { token: localToken } }
            );

            if (response.data.success) {
                toast.success("Payment successful! Your order is being prepared.");
                navigate("/myorders");
            } else {
                toast.error("Payment was cancelled.");
                navigate("/");
            }
        } catch (error) {
            toast.error("Error verifying payment.");
            navigate("/");
        }
    }

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className="verify">
            <div className="verify-content">
                <div className="spinner"></div>
                <p>Verifying your payment...</p>
            </div>
        </div>
    )
}

export default Verify;
