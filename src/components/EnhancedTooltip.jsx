import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const EnhancedTooltip = ({ 
  children, 
  title, 
  description, 
  examples = [], 
  tips = [] 
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-block ml-2 cursor-help text-gray-500 hover:text-gray-700">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="w-80 p-4 bg-white border rounded-lg shadow-lg" side="right">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
            
            {examples.length > 0 && (
              <div className="mt-2">
                <h4 className="font-medium text-sm">Examples:</h4>
                <ul className="list-disc pl-4 text-sm text-gray-600">
                  {examples.map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {tips.length > 0 && (
              <div className="mt-2">
                <h4 className="font-medium text-sm">Tips:</h4>
                <ul className="list-disc pl-4 text-sm text-gray-600">
                  {tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EnhancedTooltip;