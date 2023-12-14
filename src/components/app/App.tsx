/* eslint-disable react-refresh/only-export-components */

import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import SharedLayout from "../common/SharedLayout";

const HomePage = lazy(() => import("../home/HomePage"));
const LoginPage = lazy(() => import("../login/LoginPage"));
const RegistrationPage = lazy(() => import("../registration/RegistrationPage"));
const Account = lazy(() => import("../account/AccountPage"));
const News = lazy(() => import("../news/NewsPage"));
const FindPetPage = lazy(() => import("../find-pet/FindPetPage"));
const OurFriendPage = lazy(() => import("../our-friend/OurFriendPage"));
const ErrorPage = lazy(() => import("./ErrorPage"));

export const router = createBrowserRouter([
	{
		path: "/",
		element: <SharedLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/registration",
				element: <RegistrationPage />,
			},
			{
				path: "/account",
				element: <Account />,
			},
			{
				path: "/news",
				element: <News />,
			},
			{
				path: "/find-pet",
				element: <FindPetPage />,
			},
			{
				path: "/our-friend",
				element: <OurFriendPage />,
			},
		],
	},
]);
