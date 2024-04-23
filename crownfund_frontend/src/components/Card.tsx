import { useEffect, useState } from 'react'
import catNFT from '../assets/cat_nft.gif'
import monkeyNFT1 from '../assets/monkey_nft.gif'
import monkeyNFT2 from '../assets/monkey_nft_2.gif'
import { ethers } from 'ethers'
import CONTRACTS from '../constants/constants';
// import Loader from '../layout/Loader'

const Card: React.FC<any> = ({ wallet: walletFromParant }: any) => {

    interface nftDatasInterface {
        src: string,
        name: string,
        description: string,
        raised_fund: number
    }

    const [nftDatas, setNftDatas] = useState<Array<nftDatasInterface>>([]);
    const [contract, setcontract] = useState<any>();
    const [totalFund, settotalFund] = useState<string>()
    const [ETHvalue, setETHvalue] = useState<number>(0);
    const [userBalance, setuserBalance] = useState(0)


    useEffect(() => {
        setNftDatas([{
            src: catNFT,
            name: 'CAT foundation',
            description: 'we are raising fund to save little kittens..',
            raised_fund: 235,
        }
        ])
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(signer);
        console.log(CONTRACTS);

        const contract = new ethers.Contract(
            CONTRACTS.CROWD_FUND.ADDRESS,
            CONTRACTS.CROWD_FUND.ABI,
            signer
        );
        const runthisFirst = async () => {
            const userBalance = await provider.getBalance(walletFromParant[0]);
            setuserBalance(Number(ethers.utils.formatEther(userBalance)))
        }

        runthisFirst();

        setcontract(contract);
        const intervalId = setInterval(async () => {
            getTotalFund(contract)
        }, 3000);
        return () => clearInterval(intervalId);

    }, [])

    const SupportUSClicked = async () => {
        console.log("Suppported");
        try {
            if (!(ETHvalue > 0)) {
                alert("Enter amount greater than Zero")
            } else if (userBalance < ETHvalue) {
                alert('Insuffecient FUNDS')
            } else {
                const fund_transaction = await contract.fund({
                    value: ethers.utils.parseEther(ETHvalue.toString()),
                    gasLimit: 100000
                })
                await fund_transaction.wait(1);
                console.log(fund_transaction);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getTotalFund = async (contract: any) => {
        try {
            const bigNumber = ethers.utils.formatEther(ethers.BigNumber.from(await contract.getBalance()).toString())
            settotalFund(bigNumber)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {walletFromParant.length > 0 && (
                <div className="row">
                    {nftDatas.length > 0 &&
                        nftDatas.map((element: nftDatasInterface, index: number) => (
                            <div className="col-sm-3" key={index}>
                                <div className="card" style={{ width: "20rem" }} key={index}>
                                    <img src={element.src} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{element.name}</h5>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"> </li>
                                            <li className="list-group-item">Fund Raised: {totalFund} {CONTRACTS.GENERAL.SYMBOL}
                                            </li>
                                            <li className="list-group-item">Balance: <span style={{ color: CONTRACTS.GENERAL.SYMBOL_COLOUR }}>{userBalance}</span> {CONTRACTS.GENERAL.SYMBOL}</li>
                                            <li className="list-group-item"></li>
                                        </ul>
                                        <p className="card-text">
                                            {element.description}
                                        </p>
                                        <div className="input-group mb-3">
                                            <input value={ETHvalue} type="number" className="form-control" placeholder="" aria-label="" onChange={(e) => setETHvalue(Number(e.target.value))} />
                                            {ETHvalue > 0 &&
                                                <span className="input-group-text" style={{ cursor: 'pointer' }} id="basic-addon2" onClick={() => { setETHvalue(userBalance) }}>MAX</span>
                                            }
                                            <span className="input-group-text" id="basic-addon2">{CONTRACTS.GENERAL.SYMBOL}</span>
                                        </div>
                                        <div style={{ color: 'red', fontSize: '12px' }}>exclusive of GAS price</div>
                                        <button className="btn btn-primary" onClick={SupportUSClicked}>
                                            Support US!!!
                                        </button>
                                        {/* <button className="btn btn-primary" onClick={getTotalFund}>
                                            Get Balance
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}  
        </>
    )
}
export default Card