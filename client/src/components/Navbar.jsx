export default function Navbar() {
    return (
        <div>
            <nav className="w-full sm:p-0 md:p-2 justify-between items-center mb-6">
                <h1 className="mb-4 text-5xl font-extrabold"><span
                    className="box-decoration-clone bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4">
                    Houseplants Of The World</span></h1>

                <p className="sm:w-full md:w-3/4 lg:w-1/2 text-sm md:text-base font-normal">
                    Curious to know where your houseplants are native? Interact with the globe below to see the countries
                    where popular houseplant species feel truly at home.
                </p>
            </nav>
        </div>
    );
}