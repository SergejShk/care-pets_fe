import { FC } from "react";

import SharedLayout from "../common/SharedLayout";
import Header from "./Header";
import Home from "../home/Home";

const App: FC = () => {
	return (
		<SharedLayout>
			<Header />
			<Home />
		</SharedLayout>
	);
};

export default App;
