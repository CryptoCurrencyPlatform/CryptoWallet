import React, { useState ,useContext,useEffect, useMemo} from 'react';
import './FAQPage.css';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Animate_page from '../../Animate-page';
import axios from "axios"
import { UserContext } from '../../context/userContext';

const FAQPage = () => {
    const [theme, setTheme] = useState('dark'); // Default theme is dark
    const navigate = useNavigate()

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showHelpOverlay, setShowHelpOverlay] = useState(false);
    const [backgroundIndex, setBackgroundIndex] = useState(0);

    const [openQuestions, setOpenQuestions] = useState({});

    const {user, setUser} = useContext(UserContext)

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'green' : 'dark');
    };

    const toggleQuestion = (questionIndex) => {
        setOpenQuestions((prevOpenQuestions) => ({
          ...prevOpenQuestions,
          [questionIndex]: !prevOpenQuestions[questionIndex],
        }));
      };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleHelpClick = () => {
        setShowHelpOverlay(!showHelpOverlay);
    };

    const handleLiveChatClick = () => {
        // Navigate to the live chat page
        navigate('/livechat');
    };

    const handleFAQClick = () => {
        navigate('/FAQPage')
    }

    const backgroundImages = [
        'url(../assets/images/Send_transactions.png)',
        'url(../assets/images/Live_Market_Stats.png',
        'url(../assets/images/image3.jpg)',
        'url(../assets/images/image4.jpg)',
    ];

    const handleSignOut = async () => {
        try {
            await axios.post('/logout'); // Assuming your logout endpoint is at /logout
            setUser(null); // Set user in context to null
            // Optionally, redirect to login page
        } catch (error) {
            console.error('Error during logout:', error);
            // Handle errors appropriately, e.g., display an error message to the user
        }
    };
    const nextBackground = () => {
        if (backgroundIndex + 1 >= backgroundImages.length) {
            // If index exceeds length, toggle help overlay
            setShowHelpOverlay(!showHelpOverlay);
        } else {
            // Increment index to switch to the next background image
            setBackgroundIndex((prevIndex) => prevIndex + 1);
        }
    };

    const prevBackground = () => {
            // Decrement index to switch to the next background image
        if (backgroundIndex >= 0) {
            setBackgroundIndex((prevIndex) => prevIndex - 1);
        }
    }

  return (
        <Animate_page>
            <body className='body102'>
            <div className="Background">
                <div className="main-container">
                    <div className="main-frame-background">
                        <div className="account-bar">
                            <span className="account">{user && (user.username)}</span>
                            {user && console.log("username is", user.username)}
                            <div className="vector" onClick={toggleDrawer} />
                        </div>
                        {/* Drawer Sidebar */}
                         <div className={`faq-page`}>
                       <h1>Frequently Asked Questions</h1>
                      <div className="questions">
                        <div className="question">
                           <h2 onClick={() => toggleQuestion(1)}>How Deposit / Withdraw money?</h2>
                           {openQuestions[1] && <p>Follow these steps:.</p>}
                        </div>
                        <div className="question">
                           <h2 onClick={() => toggleQuestion(2)}>How do I perform transactions?</h2>
                           {openQuestions[2] && <p>Do this:</p>}
                        </div>
                        <div className="question">
                           <h2 onClick={() => toggleQuestion(3)}>How do I do something else?</h2>
                           {openQuestions[3] && <p>Do this:</p>}
                        </div>
                        <div className="question">
                           <h2 onClick={() => toggleQuestion(4)}>And what about this?</h2>
                           {openQuestions[4] && <p>Do this:</p>}
                        </div>
                        <div className="question">
                           <h2 onClick={() => toggleQuestion(5)}>And what about this?</h2>
                           {openQuestions[5] && <p>Do this:</p>}
                        </div>
                        {/* Add more questions here */}
                      </div>
                     </div>
                    </div>
                </div>
            </div>
            </body>
        </Animate_page>
  );
};

export default FAQPage;