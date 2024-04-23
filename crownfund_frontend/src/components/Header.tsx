import { useState } from "react";

const Header: React.FC<any> = ({ setWalletFunction }: any) => {

    const [buttonState, setButtonState] = useState([]);

    const ConnectYourWallet = async () => {
        const wallet = await WalletConnection();
        console.log("wallet from function", wallet);
        setWalletFunction(wallet)
        setButtonState(wallet)
    }

    const WalletConnection = async (): Promise<any> => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                if (typeof window.ethereum != "undefined") {
                    const wallet = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    console.log("wallet", wallet);
                    resolve(wallet)
                } else {
                    console.log("Metamask is UN-available");
                    reject([])
                }
            } catch (error) {
                console.log(error);
                reject([])
            }
        })
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Crowd Funding</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                        <a className="nav-item nav-link active" href="/">Home</a>
                        <a className="nav-item nav-link" href="/">Browse</a>
                        <a className="nav-item nav-link" href="/admin">Admin</a>
                        {/* <a className="nav-item nav-link disabled" href="#">Disabled</a> */}
                    </div>
                    {buttonState.length === 0 ? (
                        <div className="d-flex">
                            <button className="btn btn-primary" type="button" onClick={ConnectYourWallet}>Connect Your Wallet</button>
                        </div>
                    ) : (
                        <div className="d-flex" >
                            CONNECTED : {buttonState[0]}
                        </div>
                    )}

                </div>
            </div>
        </nav>
    )
}
export default Header;