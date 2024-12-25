// import React from "react";
import { IconType } from "react-icons";
import * as AiReactIcons from "react-icons/ai";
import * as BsReactIcons from "react-icons/bs";
import * as BiReactIcons from "react-icons/bi";
import * as HiReactIcons from "react-icons/hi";
import * as HiReactIcons2 from "react-icons/hi2";
import * as Io5ReactIcons from "react-icons/io5";
import * as TbReactIcons from "react-icons/tb";
import * as SiReactIcons from "react-icons/si";
import * as FaReactIcons from "react-icons/fa";
import * as Fa6ReactIcons from "react-icons/fa6";
import * as GoReactIcons from "react-icons/go";


import { createElement } from "react";

const DisplayIcons = (iconName: string): IconType => {
    const biIcons: { [key: string]: IconType } = BiReactIcons;
    const bsIcons: { [key: string]: IconType } = BsReactIcons;
    const aiIcons: { [key: string]: IconType } = AiReactIcons;
    const hiIcons: { [key: string]: IconType } = HiReactIcons;
    const ioIcons: { [key: string]: IconType } = Io5ReactIcons;
    const tbicons: { [key: string]: IconType } = TbReactIcons;
    const siIcons: { [key: string]: IconType } = SiReactIcons;
    const faIcons: { [key: string]: IconType } = FaReactIcons;
    const fa6Icons: { [key: string]: IconType } = Fa6ReactIcons;
    const hi2Icons: { [key: string]: IconType } = HiReactIcons2;
    const goIcons: { [key: string]: IconType } = GoReactIcons;

    if (iconName.startsWith("Ai")) {
        return aiIcons[iconName];
    }
    if (iconName.startsWith("Bs")) {
        return bsIcons[iconName];
    }
    if (iconName.startsWith("Bi")) {
        return biIcons[iconName];
    }
    if (iconName.startsWith("Hi")) {
        return hiIcons[iconName];
    }
    if (iconName.startsWith("Io")) {
        return ioIcons[iconName];
    }
    if (iconName.startsWith("Tb")) {
        return tbicons[iconName];
    }
    if (iconName.startsWith("Si")) {
        return siIcons[iconName];
    }
    if (iconName.startsWith("Fa")) {
        return faIcons[iconName];
    }
    if (iconName.startsWith("Fa6")) {
        return fa6Icons[iconName];
    }
    if (iconName.startsWith("Hi2")) {
        return hi2Icons[iconName];
    }
    if (iconName.startsWith("Go")) {
        return goIcons[iconName];
    }
    throw new Error(`Unknown icon name: ${iconName}`);
};

const WiseIcon: React.FC<{ iconName: string, size?: number, className?: string }> = ({ iconName, size = 18, className }) => {

    return (
        <span style={{ fontSize: size }} className={className}>
            {createElement(DisplayIcons(iconName))}
        </span>
    );
};

export default WiseIcon;
