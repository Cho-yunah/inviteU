import React, { useState } from "react";
import { MINUTE, PERIOD, TIME } from "@/constants/edit";
import TimeSelect from "./TimeSelect";

const TimePickerInput = React.forwardRef<HTMLInputElement>(() => {

    const [time, setTime] = useState('')
    const [minutes, setMinutes] = useState('')
    const [period, setPeriod] = useState("PM");
 
    return (
      <div className=" h-[120px] w-full flex justify-center overflow-hidden">
        <div className="mx-1"><TimeSelect arr={TIME} item={time} setItem={setTime}/></div>
        <div className="mx-1"><TimeSelect arr={MINUTE} item={minutes} setItem={setMinutes}/></div>
        <div className="mx-1"><TimeSelect arr={PERIOD} item={period} setItem={setPeriod}/></div>
      </div>
    );
  }
);
 
TimePickerInput.displayName = "TimePickerInput";
 
export { TimePickerInput };