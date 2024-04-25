import { ethers } from "ethers";
import CONTRACTS from '../constants/constants';

import { useState } from "react";

const Admin: React.FC = () => {

    const [walletAddress, setWallet] = useState()

    const WithDrawFund = async () => {
        try {

            const wallet = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log("wallet", wallet);
            setWallet(wallet[0])

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log(signer);
            console.log(CONTRACTS);

            const contract = new ethers.Contract(
                CONTRACTS.CROWD_FUND.ADDRESS,
                CONTRACTS.CROWD_FUND.ABI,
                signer
            );

            const tx = await contract.withdraw(wallet[0]);
            await tx.wait(1);
        } catch (error) {
            console.log(error);

        }
    }

    const VoteToWithdraw = async (vote: boolean) => {
        console.log(vote);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        console.log(signer);
        console.log(CONTRACTS);

        const contract = new ethers.Contract(
            CONTRACTS.CROWD_FUND.ADDRESS,
            CONTRACTS.CROWD_FUND.ABI,
            signer
        );

        const voted = await contract.vote(true);
        await voted.wait(1)
        console.log(voted);
    }
    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <form>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Address</label>
                        <div className="col-sm-9">
                            <input type="text" placeholder={walletAddress} className="form-control" id="inputEmail3" value={walletAddress} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-9 offset-sm-2">
                            <label>Athorize other Owner to Withdraw</label>
                            <button type="button" className="btn btn-primary mx-2 mb-2" onClick={() => VoteToWithdraw(true)}>Yes</button>
                            <button type="button" className="btn btn-primary mx-2 mb-2" onClick={() => VoteToWithdraw(false)}>No</button>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={WithDrawFund}>Withdraw your fund</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Admin;