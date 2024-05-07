interface subLinksType {
    title: string;
    link: string;
}

type sidebarType = {
    title: string;
    icon: JSX.Element;
    link: string;
    subLinks?: subLinksType[];
};

export default sidebarType;

export type { subLinksType };
