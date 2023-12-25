import { Typography } from "@material-tailwind/react";

export function FooterWithLogo() {
    return (
        <footer className="w-full bg-[#18181B] text-white  p-8">
            <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-white  text-center md:justify-between">
                {/* <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="logo-ct" className="w-10" /> */}
                <h1 className="font-bold tracking-[0.2rem]">TAWHEED</h1>
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            // color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            About Us
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            // color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            License
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            // color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Contribute
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            // color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Contact Us
                        </Typography>
                    </li>
                </ul>
            </div>
            <hr className="my-8 border-blue-gray-50" />
            <Typography color="white" className="text-center font-normal">
                &copy; 2023 TAWHEED
            </Typography>
        </footer>
    );
}