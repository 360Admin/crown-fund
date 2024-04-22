import { useEffect, useState } from 'react'
import catNFT from '../assets/cat_nft.gif'
import monkeyNFT1 from '../assets/monkey_nft.gif'
import monkeyNFT2 from '../assets/monkey_nft_2.gif'

const Card: React.FC = () => {

    interface nftDatasInterface {
        src: string,
        name: string,
        description: string,
        raised_fund: number
    }

    const [nftDatas, setNftDatas] = useState<Array<nftDatasInterface>>([]);
    useEffect(() => {
        setNftDatas([{
            src: catNFT,
            name: 'CAT foundation',
            description: 'we are raising fund to save little kittens..',
            raised_fund: 235,
        }, {
            src: monkeyNFT1,
            name: 'dsfsdfdsfgkkdbfvoikdfgkodfkg joi',
            description: 'SWAG',
            raised_fund: 123,
        }, {
            src: monkeyNFT2,
            name: 'Random monkey',
            description: 'save Monkeys',
            raised_fund: 278
        }])
    }, [])

    return (
        <>
            <div className="row">
                {nftDatas.length > 0 &&
                    nftDatas.map((element: nftDatasInterface, index: number) => (
                        <div className="col-sm-2">
                            <div className="card" style={{ width: "18rem" }} key={index}>
                                <img src={element.src} className="card-img-top" alt="..." />

                                <div className="card-body">
                                    <h5 className="card-title">{element.name}</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"> </li>
                                        <li className="list-group-item">raised money : {element.raised_fund}</li>
                                        {/* <li className="list-group-item"> </li> */}
                                        <li className="list-group-item"></li>
                                    </ul>
                                    <p className="card-text">
                                        {element.description}
                                    </p>
                                    <a href="#" className="btn btn-primary">
                                        Support US!!!
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>

        </>
    )
}
export default Card