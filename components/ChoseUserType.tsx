import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
    onChange: (type: "client" | "designer") => void;
}

export const ChoseUserType: React.FC<Props> = ({ className, onChange }) => {
    const [userType, setUserType] = useState<"client" | "designer">("client");

    const handleClick = (type: "client" | "designer") => {
        setUserType(type);
        onChange(type);
    };

    return (
        <div className={cn("", className)}>
            <div className="flex rounded-lg overflow-hidden border border-gray-300">
                <button
                    type="button"
                    className={`flex-1 py-3 px-4 text-center font-bold text-xl transition-all ease-linear duration-200 ${userType === "client" ? "bg-GRAY text-white" : "bg-white text-GRAY"
                        }`}
                    onClick={() => handleClick("client")}
                >
                    КЛІЄНТ
                </button>
                <button
                    type="button"
                    className={`flex-1 py-3 px-4 text-center font-bold text-xl transition-all ease-linear duration-200 ${userType === "designer" ? "bg-GRAY text-white" : "bg-white text-GRAY"
                        }`}
                    onClick={() => handleClick("designer")}
                >
                    ДИЗАЙНЕР
                </button>
            </div>
        </div>
    );
};