import React, { useState } from 'react';
import { AutoComplete } from "@/components/kit/AutoComplete/AutoComplete";
import {DropDown} from "@/components/kit/DropDown/DropDown";

const MyJobs = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <h1>Мои заявки / История заявок</h1>

      <AutoComplete />
      <DropDown
        anchor={ref => (
          <button ref={ref} onClick={() => setOpen(prev => !prev)}>
            Dropdown open
          </button>
        )}
        open={open}
        onClose={() => setOpen(false)}
      >
        {Array.from(Array(4).keys()).map((_, i) => (
          <DropDown.Item key={`key_${i}`} onClick={() => console.log(i)}>item = {i}</DropDown.Item>
        ))}
      </DropDown>
    </div>
  );
};

export default MyJobs;