import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    Bars4Icon,

    PhoneIcon,

    UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { GiBookmarklet } from "react-icons/gi";
const navListMenuItems = [
    {
        title: "Al-Quran",
        description: "Find the perfect solution for your needs.",
        icon: GiBookmarklet,
        link: "/alquran",
    },
    {
        title: "Hadis",
        description: "Find the perfect solution for your needs.",
        icon: GiBookmarklet,
        link: "/hadis",

    },
    {
        title: "Blog",
        description: "Find the perfect solution for your needs.",
        icon: Bars4Icon,
        link: "/blog",

    },

    {
        title: "Contact",
        description: "Find the perfect solution for your needs.",
        icon: PhoneIcon,
        link: "/contact",
    },

];

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const renderItems = navListMenuItems.map(
        ({ icon, title, description, link }, key) => (
            // <a key={key} className="">
            <Link key={key} to={link} >

                <div className="flex p-0.5  items-center gap-3 rounded-lg hover:bg-[#323232] my-1">
                    <div className="flex  items-center justify-center rounded-lg bg-[#1d4ed8] p-2 ">
                        { }
                        {React.createElement(icon, {
                            strokeWidth: 2,
                            className: "h-6 text-white w-6",
                        })}
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="white"
                            className="flex items-center text-sm font-bold"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="paragraph"
                            className="text-xs !font-medium text-white"
                        >
                            {description}
                        </Typography>
                    </div>
                </div>
            </Link>
            // </a>
        ),
    );

    return (
        <React.Fragment>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                // offset={{ mainAxis: 20 }}
                placement="bottom"
            // allowHover={true}

            >
                <MenuHandler>
                    <Typography as="div" variant="small" className="font-medium bg-transparent">
                        <ListItem
                            className="flex items-center gap-2 py-2 pr-4 font-bold hover:bg-transparent hover:text-white text-white "
                            // selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            Resources
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </ListItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden max-w-screen-xl rounded-xl lg:block bg-[#18181B]">
                    <ul className="grid grid-cols-2 gap-y-2 outline-none outline-0 gap-3 ">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <div className="block lg:hidden">
                <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
            </div>
        </React.Fragment>
    );
}

function NavList() {
    return (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 md:justify-center md:items-center justify-start items-start ">
            <Typography
                as="li"
                // href="#"
                variant="small"
                color="white"
                className="font-medium"
            >
                {/* <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem> */}
                <Link to="/" >
                    <div className="flex items-center gap-2 py-2 pr-4 hover:bg-transparent hover:text-[#1d4ed8] font-bold duration-500">
                        Home
                    </div>
                </Link>

            </Typography>
            <NavListMenu />
            <Typography
                as="a"
                // href="#"
                variant="small"
                color="white"
                className="font-medium cursor-pointer"
            >
                <div className="flex items-center gap-2 py-2 pr-4 hover:bg-transparent hover:text-[#1d4ed8] font-bold duration-500">
                    Contact Us
                </div>
            </Typography>
        </List>
    );
}

export function NavbarWithMegaMenu() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);
    // -----------------------------------------------


    const [nav, setNav] = React.useState(false);
    React.useEffect(() => {
        window.addEventListener('scroll', () => {
            // const nav = document.querySelector('nav')
            window.scrollY > 0 ? setNav(true) : setNav(false)
        })
    })






    return (
        <Navbar className={`sticky z-50  top-0 m-0 mx-auto max-w-full px-4 py-2 rounded-none bg-[#18181B] text-white border-0 ${nav ? 'shadow-md' : 'shadow-none'}`}>
            <div className="flex items-center justify-between text-white">
                <Typography
                    as="li"
                    // href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5 lg:ml-2"
                >
                    <Link to="/" className="flex items-center">
                        TAWHEED
                    </Link>
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <div className="hidden gap-3 lg:flex">
                    <Button variant="outlined" className="bg-transparent text-white shadow-none border border-transparent hover:shadow-none hover:border-[#1d4ed8] " size="sm" color="white">
                        Log In
                    </Button>
                    <Button className="bg-[#1d4ed8]" size="sm">
                        Sign In
                    </Button>
                </div>
                <IconButton
                    variant="text"
                    color="blue-gray"
                    className="lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav} onClick={() => setOpenNav(!openNav)}>
                <NavList />
                <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                    <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
                        Log In
                    </Button>
                    <Button className="bg-[#1d4ed8]" size="sm" fullWidth>
                        Sign In
                    </Button>
                </div>
            </Collapse>
        </Navbar>
    );
}