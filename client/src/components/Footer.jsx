import './../App.css'

export default function Navbar() {
    return (
        <div>

            <footer className="py-4">
                <section className="w-full p-2 flex items-center justify-center">
                    <p className="text-center text-sm ">This app is made with &#127793;, &#10084;, Mapbox, and MERN stack. <a href="https://www.cassidyarden.com" className="hover:underline text-emerald-600">GitHub source code</a>.</p>
                </section>
                <section className="w-full p-2 flex items-center justify-center">
                    <span className="text-center text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://www.cassidyarden.com" className="hover:underline">Cassidy Arden</a></span>
                </section>
            </footer>
        </div>
    );
}