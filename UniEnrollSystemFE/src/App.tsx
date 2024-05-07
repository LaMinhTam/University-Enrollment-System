import Modal from "react-modal";
Modal.setAppElement("#root");
Modal.defaultStyles = {};
const App = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default App;
