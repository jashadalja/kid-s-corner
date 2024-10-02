import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductDetails.css';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
const ProductDetails = () => {

    const navigate = useNavigate()

    const serviceID = 'service_2agyi6o';
    const templateID = 'template_m7whu4p';
    const userID = 'HnRQkzYiZqmGw1sKT';

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // For purchase flow
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [showDetailsInput, setShowDetailsInput] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [quantity, setQuantity] = useState(1); // New state for quantity
    const [totalPrice, setTotalPrice] = useState(0); // State for total price

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/getproduct/`, { id: productId });
                setProduct(response.data.result);
                console.log(productId)
                // console.log(response.data.result);
                setTotalPrice(response.data.result.price); // Set initial total price
            } catch (err) {
                console.error('Error fetching product details:', err);
                setError('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleBackClick=()=>{
        navigate('/shopping')
    }

    const handleQuantityChange = (change) => {
        const newQuantity = Math.max(1, Math.min(5, quantity + change)); // Ensure quantity is between 1 and 5
        setQuantity(newQuantity);
        setTotalPrice(product.price * newQuantity); // Update total price based on quantity
    };

    const handleBuyClick = () => {
        setShowEmailInput(true);
    };

    const handleEmailSubmit = () => {
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6 digit OTP
        setGeneratedOtp(otp);
        setShowEmailInput(false);
        setShowOtpInput(true);

        const templateParams = {
            subject: "📢 OTP For Purchase Product From Kid's Corner 📚",
            email: `${email}`, 
            message1: `${otp}`,
            motive: `ordering a ${product.name} from Kid's Corner. Your OTP : ${otp}`, // Include OTP in motive
            regards: "Best Regards, Kids Corner",
        };
        
        console.log('before sending mail');
        emailjs.send(serviceID, templateID, templateParams, userID)
            .then((res) => {
                console.log('after sending');
                console.log('SUCCESS!', res.status, res.text);
                toast.success(`OTP sent to : ${email}`); // Display the OTP success message
            })
            .catch((error) => {
                console.error('Email sending failed:', error);
                toast.error("Something went wrong in OTP sending");
            });
    };

    const handleOtpSubmit = () => {
        if (otp == generatedOtp) {
            setShowOtpInput(false);
            setShowDetailsInput(true);
        } else {
            toast.error('Invalid OTP. Please try again.'); // Display error using toast
        }
    };

    const handlePurchaseConfirm = async () => {
        try {

            const amountInPaise = parseInt(totalPrice * 100);


            console.log(amountInPaise);


            const orderUrl = `${import.meta.env.VITE_BACKEND_API}/create-order`;
            const response = await axios.post(orderUrl, {
                amount: amountInPaise,
                currency: 'INR',
                receipt: 'receipt#1'
            });

            const { id, amount, currency } = response.data;

            const options = {
                key: 'rzp_test_pVMPiZnpHDsa6g',
                amount: amount,
                currency,
                name: "Kid's Corner",
                description: 'Ordering item with Kids Corner',
                order_id: id,
                handler: async (paymentResponse) => {
                    // Step 2: Verify payment
                    const verifyUrl = `${import.meta.env.VITE_BACKEND_API}/verify-payment`;
                    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;

                    const verifyResponse = await axios.post(verifyUrl, {
                        razorpay_order_id,
                        razorpay_payment_id,
                        razorpay_signature
                    });
                    console.log('before success')
                    console.log(verifyResponse.data.status)
                    // Step 3: Check if payment verification was successful
                    if (verifyResponse.data.status == 'success') {
                        const currentTime = new Date().toLocaleString();
                        const name1 = product.name
                        let mobile1 = (mobileNumber)
                        let price = totalPrice
                        console.log(mobile1)
                        console.log(currentTime)
                        console.log(name1)
                        console.log(totalPrice)
                        // Step 4: Proceed to post purchase data after successful payment
                        await axios.post(`${import.meta.env.VITE_BACKEND_API}/buy-product/`, {
                            id: productId,
                            name1,
                            mobile1,
                            address: shippingAddress,
                            quantity,
                            priceT: price,
                            c: currentTime,
                            email,
                        });
                        const templateParams = {
                            subject: "📢 Your Ordered Placed Confirmation Mail 📚",
                            message1: `Order Placed Successfully`,
                            motive: `ordered a ${product.name} from Kid's Corner. Your product will receive shortly at your given address`,
                            regards: "Best Regards, Kids Corner",
                        };
                        console.log('before sending mail');
                        emailjs.send(serviceID, templateID, templateParams, userID)
                            .then((res) => {
                                toast.success('Payment successful and order placed!');
                                navigate('/shopping');
                            })
                            .catch((error) => {
                                console.error('Email sending failed:', error);
                                toast.error("Something went wrong with email sending");
                            });
                    } else {
                        toast.error('Payment verification failed.'); // Notify user of failure
                    }
                },
                prefill: {
                    name: 'Your Name',
                    email: email,
                    contact: mobileNumber
                },
                theme: {
                    color: '#3399cc'
                }
            };


            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error('Error initiating purchase:', err);
            toast.error('Something went wrong while initiating the purchase.'); // Notify user of the error
        }
    };





    if (loading) {
        return (
            <div className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-price"></div>
                <div className="skeleton-quantity"></div>
                <div className="skeleton-button"></div>
            </div>
        );
    }
    
    if (error) {
        return <div className="error">{error}</div>;
    }
    

    return (
        <div>
                <button className="back-button" onClick={handleBackClick}>
        <i className="fas fa-arrow-left"></i>
    </button>
        <div className="product-details-card">
              
            {product ? (
                <div className="card">
                    <img src={product.img_url} alt={product.name} className="product-details-image" />
                    <h2 className="product-title">{product.name}</h2>
                    <p className="product-description">{product.description}</p>
                    <p className="product-category">Category: {product.category}</p>
                    <p className="product-price">Price: {product.price.toFixed(2)}  rs</p>
                    {/* <p className="product-stock">Stock Quantity: {product.stock_quantity}</p> */}

                    {/* Quantity Selector with Plus and Minus Buttons */}
                    <div className="quantity-section">
                        <label className="quantity-label">Quantity:</label>
                        <div className="quantity-controls">
                            <button
                                className="quantity-btn"
                                onClick={() => handleQuantityChange(-1)}
                                disabled={quantity <= 1} // Disable minus button if quantity is 1
                            >
                                -
                            </button>
                            <span className="quantity">{quantity}</span>
                            <button
                                className="quantity-btn"
                                onClick={() => handleQuantityChange(1)}
                                disabled={quantity >= Math.min(5, product.stock_quantity)} // Disable plus button if at max stock or 5
                            >
                                +
                            </button>
                        </div>
                        <p className="total-price">Total Price: {totalPrice.toFixed(2)}  rs</p>
                    </div>

                    <button className="buy-button" onClick={handleBuyClick}>Next</button>

                    {showEmailInput && (
                        <div className="input-section">
                            <input
                                type="email"
                                className="email-input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ fontFamily: 'Arial, sans-serif', textTransform:'lowercase' }}
                            />
                            <button className="confirm-email-button" onClick={handleEmailSubmit}>Confirm Email</button>
                        </div>
                    )}

                    {showOtpInput && (
                        <div className="input-section">
                            <input
                                type="text"
                                className="otp-input"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button className="verify-otp-button" onClick={handleOtpSubmit}>Verify OTP</button>
                        </div>
                    )}

                    {showDetailsInput && (
                        <div className="input-section">
                            <input
                                type="text"
                                className="mobile-input"
                                placeholder="Mobile Number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                            <input
                                type="text"
                                className="address-input"
                                placeholder="Shipping Address"
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                            />
                            <button className="buy-confirm-button" onClick={handlePurchaseConfirm}>Buy This Item</button>
                        </div>
                    )}
                </div>
            ) : (
                <div>Product not found</div>
            )}
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} />
        </div></div>
    );
};

export default ProductDetails;
