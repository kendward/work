import { ToastConfig } from "@/hooks/useToaster";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({
    children,
    config,
}: {
    children: React.ReactNode;
    config?: ToastConfig;
}) => (
    <>
        <ToastContainer transition={Bounce} {...config} />
        {children}
    </>
);

export default ToastProvider;