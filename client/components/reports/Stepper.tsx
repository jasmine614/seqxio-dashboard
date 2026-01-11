import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Step {
  label: string;
  component: React.ComponentType<any>;
}

interface StepperProps {
  steps: Step[];
}

export function Stepper({ steps }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const ActiveStep = steps[currentStep].component;

  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {steps.map((step, index) => (
            <div key={index} className={`flex items-center gap-2 ${index > currentStep ? 'opacity-50' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-gray-200'}`}>
                {index + 1}
              </div>
              <span className="font-medium">{step.label}</span>
              {index < steps.length - 1 && <div className="w-12 h-px bg-gray-200"></div>}
            </div>
          ))}
        </div>
      </div>
      
      <ActiveStep />

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
