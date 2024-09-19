import './style.css';
import { useState } from 'react';
import Tab from './Tab';

export default function Tabs({data}) {

    const [activeTab, setActive] = useState(0);

    function handleClick(index) {
        if (activeTab !== index) {
            setActive(index);
        }
    }

    return (
        <>
        Tabs list
        <div className="tabsList">
            {data.map((item, index) => {
                return (
                    <div>
                        <Tab 
                            key={index}
                            name={item.name}
                            onClick={() => handleClick(index)}
                            isActive={index === activeTab}
                        />
                        <div>
                            {index === activeTab ? item.text : null}
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    );
}