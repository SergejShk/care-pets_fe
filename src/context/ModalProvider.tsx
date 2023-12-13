import { FC, ReactNode, createContext, useContext, useState } from "react";

interface IModalContext {
	isMobileMenuOpen: boolean;
}

type StateContextType = {
	modal: IModalContext;
	setModal: React.Dispatch<React.SetStateAction<IModalContext>>;
};

interface IProps {
	children: ReactNode;
}

const initialState: IModalContext = {
	isMobileMenuOpen: false,
};

const ModalContext = createContext<StateContextType>(null as unknown as StateContextType);

export const ModalProvider: FC<IProps> = ({ children }) => {
	const [modal, setModal] = useState<IModalContext>(initialState);

	return <ModalContext.Provider value={{ modal, setModal }}>{children}</ModalContext.Provider>;
};

export default ModalContext;

export const useModalContext = () => useContext(ModalContext);
