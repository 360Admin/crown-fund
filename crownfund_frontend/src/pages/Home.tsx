import React, { useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";

declare global {
    interface Window {
        ethereum?: any;
    }
}
const Home: React.FC = () => {

    const [wallet, setWallet] = useState<Array<any>>([]);

    const setDataToWallet = (data: any) => {
        setWallet(data)
    }

    return (
        <>
            <Header setWalletFunction={setDataToWallet} />
            {wallet.length > 0 ? (<Card wallet={wallet} />) : null}

        </>
    )
}
export default Home;