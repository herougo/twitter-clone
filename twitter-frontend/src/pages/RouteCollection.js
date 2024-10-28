import { Route, Routes } from 'react-router-dom';
import React from 'react';
import LoginRestricted from '../components/utility/LoginRestricted';
import WelcomePage from './welcome/WelcomePage';
import SignupPage from './signup/SignupPage';

import { 
    HomePageContent, MessagePageContent, MessagesPageContent, 
    NewMessagePageContent, NotificationsPageContent, PostPageContent, 
    ProfilePageContent, SearchPageContent, StorePageContent, MainPage
} from './main';

const RouteCollection = () => {
    return (
        <Routes>
            <Route exact path="/" element={
                <LoginRestricted>
                    <MainPage />
                </LoginRestricted>
            }>
                <Route exact path="/" element={
                    <HomePageContent />
                }></Route>
                <Route exact path="/post/:id" element={
                    <PostPageContent />
                }></Route>
                <Route exact path="/profile" element={
                    <ProfilePageContent />
                }></Route>
                <Route exact path="/profile/:username" element={
                    <ProfilePageContent />
                }></Route>
                <Route exact path="/search" element={
                    <SearchPageContent />
                }></Route>
                <Route exact path="/store" element={
                    <StorePageContent />
                }></Route>
                <Route exact path="/notifications" element={
                    <NotificationsPageContent />
                }></Route>
                <Route exact path="/messages" element={
                    <MessagesPageContent />
                }></Route>
                <Route exact path="/messages/new" element={
                    <NewMessagePageContent />
                }></Route>
                <Route exact path="/messages/:id" element={
                    <MessagePageContent />
                }></Route>
            </Route>
            <Route exact path="/welcome" element={<WelcomePage />}>
            </Route>
            <Route exact path="/signup" element={<SignupPage />}>
            </Route>
        </Routes>
    );
}

export default RouteCollection;
