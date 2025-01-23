import { useState } from "react";
import MovieList from "./Cine/MovieList";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { MovieContext } from "./context";

function App() {
    const [cartData, setCartData] = useState([]);

    return (
        <>
            <MovieContext.Provider value={{cartData, setCartData}}>
            <Header />
            <main>
                <div class="container grid lg:grid-cols-[218px_1fr] gap-[3.5rem]">
                    <Sidebar />
                    <MovieList />
                </div>
            </main>
            <Footer />
            </MovieContext.Provider>

        </>
    );
}

export default App;
