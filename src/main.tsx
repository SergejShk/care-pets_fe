import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientConfig, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";

import { router } from "./components/app/App.tsx";

import { AuthProvider } from "./context/AuthProvider.tsx";
import { ModalProvider } from "./context/ModalProvider.tsx";

import { theme } from "./theme.ts";

import "./assets/index.css";

const queryClientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
};

const queryClient = new QueryClient(queryClientConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			<ModalProvider>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} />
					<ThemeProvider theme={theme}>
						<RouterProvider router={router} />
					</ThemeProvider>
				</QueryClientProvider>
			</ModalProvider>
		</AuthProvider>
	</React.StrictMode>
);
