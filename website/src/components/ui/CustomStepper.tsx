'use client';

import * as React from 'react';
import { Check, Mail, ClipboardList } from 'lucide-react';

interface StepProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
  isCompleted?: boolean;
  icon: React.ReactNode;
}

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ children, onClick, className = '', isActive, isCompleted, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex-1 flex items-center relative ${className}`}
        onClick={onClick}
        {...props}
      >
        <div className="flex flex-col items-center w-full">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 z-10
              ${isActive ? 'bg-green-500 text-white' : ''}
              ${isCompleted ? 'bg-green-100' : 'bg-gray-100'}`}
          >
            {isCompleted ? (
              <Check className="h-4 w-4 text-green-500 fill-green-500" />
            ) : isActive ? (
              React.cloneElement(icon as React.ReactElement, { className: 'h-4 w-4' })
            ) : (
              <Check className="h-4 w-4 text-gray-500" strokeWidth={2} />
            )}
          </div>
          <div className={`text-xs mt-1 ${isActive || isCompleted ? 'text-green-500 font-medium' : 'text-gray-500'}`}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Step.displayName = 'Step';

interface StepperProps {
  activeStep: number;
  isLastStep?: (value: boolean) => void;
  isFirstStep?: (value: boolean) => void;
  children: React.ReactElement<StepProps>[];
  className?: string;
}

export const Stepper = ({ activeStep, isLastStep, isFirstStep, children, className = '' }: StepperProps) => {
  const stepCount = children.length;

  React.useEffect(() => {
    isLastStep?.(activeStep === stepCount - 1);
    isFirstStep?.(activeStep === 0);
  }, [activeStep, stepCount, isLastStep, isFirstStep]);

  return (
    <div className="w-full">
      <div className={`flex relative ${className}`}>
        {/* Connecting lines */}
        {Array.from({ length: stepCount - 1 }).map((_, index) => (
          <div 
            key={index}
            className={`absolute top-4 h-0.5 transition-all duration-300 
              ${index < activeStep ? 'bg-green-500' : 'bg-gray-200'}`}
            style={{
              left: `${(index + 0.5) * (100 / stepCount)}%`,
              width: `${100 / stepCount}%`,
            }}
          />
        ))}
        
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, {
            key: index,
            isActive: index === activeStep,
            isCompleted: index < activeStep,
          });
        })}
      </div>
    </div>
  );
};