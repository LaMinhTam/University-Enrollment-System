import React from "react";

const useClickOutSide = (dom = "button") => {
    const [show, setShow] = React.useState(false);
    const nodeRef = React.useRef(null);
    React.useEffect(() => {
        function handleClickOutSide(e: MouseEvent) {
            if (
                nodeRef.current &&
                !(nodeRef.current as HTMLElement).contains(e.target as Node) &&
                e.target !== null && // Add null check
                !(e.target as HTMLElement).matches(dom)
            ) {
                setShow(false);
            }
        }
        document.addEventListener("click", handleClickOutSide);
        return () => {
            document.removeEventListener("click", handleClickOutSide);
        };
    }, [dom]);
    return {
        show,
        setShow,
        nodeRef,
    };
};

export default useClickOutSide;
