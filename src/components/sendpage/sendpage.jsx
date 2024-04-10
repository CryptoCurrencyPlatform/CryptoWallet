import React, { useState, useContext } from 'react';
import './send_page.css';
import useMetaMask from '../hooks/metaMaskHook';
import Animate_page from '../../Animate-page';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export default function SendPage() {
  const {
    web3,
    account,
    receiver,
    amount,
    loading,
    error,
    sendTransaction,
    handleInputChange,
    message, // Include message from useMetaMask hook
  } = useMetaMask();

  const {user, setUser} = useContext(UserContext)

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!web3) {
      console.error('Web3 is not initialized');
      return;
    }
    setSending(true);
    await sendTransaction();
    setSending(false);
  };
  console.log("error :" , error)

  return (
    <Animate_page>
    <div className='main-container2'>
      <div className='main-frame-background2'>
        <div className='form-container104'>
        <div className='big-account-bar'>
        <div className='account-bar2'>
          <span className='account2'>{user && (user.username)}</span>
          <Link to='/'>
          <div className='vector20' />
          </Link>
        </div>
        </div>
        <div className='rectangle2'>
          <p className='transfer-token20'>Transfer Token</p>
        </div>
        {message &&<p className='success-message2'>{message}</p>}
        {/* {error && <p className='error-message2'>Error: {error}</p>} */}
        <div className='transaction-details-background2'>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="receiver" className='recipient-address2'>Recipient Address :</label>
              <div className='password-input2'>
                <input
                  type="text"
                  id="receiver"
                  className='wallet-address2'
                  value={receiver}
                  onChange={(e) => handleInputChange('receiver', e.target.value)}
                  placeholder='Enter the recipient’s wallet address'
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="amount" className='token-amount2'>Token Amount :</label>
              <div className='password-input-12'>
                <input
                  type="text"
                  id="amount"
                  className='token-amount-input2'
                  value={amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder='Enter the amount of Tokens to be sent'
                  required
                />
              </div>
            </div>
            <div className='rectangle-22'>
              <button className='send2' type="submit">
                {sending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
          
        </div>
        </div>
      </div>
    </div>
    </Animate_page>
  );
}