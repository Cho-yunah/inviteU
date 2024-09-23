import React, { useState } from "react";
import { MINUTE, PERIOD, TIME } from "@/constants/edit";
import TimeSelect from "./TimeSelect";

const TimePickerInput = React.forwardRef<HTMLInputElement>(() => {

    const [time, setTime] = useState('')
    const [minutes, setMinutes] = useState('')
    const [period, setPeriod] = useState("PM");
 
    return (
     <div></div>
    );
  }
);
 
TimePickerInput.displayName = "TimePickerInput";
 
export { TimePickerInput };