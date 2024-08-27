import React from 'react'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Home from './Home';
import Feed from './Feed';
import Profile from './Profile';
import Login from './Login';
import Bookmark from './Bookmark';
import NotificationsPage from './NotificationsPage';

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home/>,
            children: [
                {
                    path: "/",
                    element: <Feed/>
                },
                {
                    path:"/profile/:id",
                    element:<Profile/>
                },
                {
                    path:"/bookmarks",
                    element: <Bookmark/>
                },
                {
                    path:"/notifications",
                    element:<NotificationsPage/>
                }
            ]
        },
        {
            path: "/login",
            element:<Login/>
        }
    ])
  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
