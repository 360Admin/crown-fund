import { ethers } from "ethers";
import { useState } from "react";
import CONTRACTS from '../constants/constants';

const VoteDate: React.FC = () => {

    type DatesTypes = {
        startDate: Date | null,
        endDate: Date | null
    }

    const [dates, setDates] = useState<DatesTypes>({
        startDate: null,
        endDate: null
    });

    const startingDate = (data: any) => {
        const selectedDate: Date = data
        console.log(selectedDate);
        setDates({ ...dates, startDate: selectedDate })
    }
    const endingDate = (data: any) => {
        const selectedDate: Date = data
        console.log(selectedDate);
        setDates({ ...dates, endDate: selectedDate })
    }
    const SubmitDates: any = async () => {

        if (dates.startDate == null && dates.endDate == null) {
            alert('Select both dates')
        } else if (checkDate(dates.startDate, dates.endDate)) {
            alert('end date should be later than start date')
        } else {
            const DATE_START: Date = new Date(dates.startDate!)
            const DATE_END: Date = new Date(dates.endDate!)

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
            console.log(signer);
            console.log(CONTRACTS);

            const contract = new ethers.Contract(
                CONTRACTS.CROWD_FUND.ADDRESS,
                CONTRACTS.CROWD_FUND.ABI,
                signer
            );
            console.log(contract);
            console.log(Math.floor(DATE_START.getTime() / 1000));

            const settime = await contract.setTimeFromTo(Math.floor(DATE_START.getTime() / 1000), Math.floor(DATE_END.getTime() / 1000));
            await settime.wait(1)
            console.log(settime);

        }

    }

    const checkDate = (_start: any, _end: any) => {
        const start = new Date(_start)
        const end = new Date(_end);

        if (start.getTime() >= end.getTime()) {
            return true
        } else {
            return false
        }

    }

    return (
        <div className="container">
            <div className="row m-auto">
                <div className="col-5 ">

                    <label htmlFor="startdate">Starting date</label>
                    <input id="startdate" type="date" className="form-control" onChange={(event) => startingDate(event.target.value)} />

                    <label htmlFor="enddate">Ending date</label>
                    <input id="enddate" type="date" className="form-control" onChange={(event) => endingDate(event.target.value)} />

                    <div>
                        <button type="button" className="btn btn-primary" onClick={SubmitDates}>Set Date</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VoteDate