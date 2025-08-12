import Loading from "@/components/Loading";
import StepContainer from "@/components/setup/StepContainer";
import { useLocalSetup } from "@/context/setup/local/useLocalSetup";
import { useSetupNavigation } from "@/context/setup/navigation";
import { useSetupProcedure } from "@/context/setup/procedure";
import { Check } from "lucide-react";

const installationSteps = [
  "Downloading Ollama...",
  "Installing Ollama runtime...",
  "Fetching LLM locally...",
  "Verifying Setup...",
];

const LocalSetup = () => {
  const { step, totalSteps } = useSetupNavigation();
  const { finishSetup } = useSetupProcedure();
  const { currentStep, percent, isInstalling, isInstalled } = useLocalSetup();

  return (
    <StepContainer
      step={step}
      totalSteps={totalSteps}
      onNext={finishSetup}
      onBack={() => {}}
      nextLabel="Finish"
      hideBack
      disabledNext={isInstalling || !isInstalled}
    >
      {isInstalled ? (
        <div>
          <h1 className="text-5xl font-semibold text-primary">
            Setup Complete!
          </h1>
          <p className="text-uGrayLight text-lg mt-4">
            You're now ready to explore Open2E. Click "Finish" to get started
          </p>
        </div>
      ) : isInstalling ? (
        <div className="flex flex-col justify-between h-full pb-8 pt-28">
          <div>
            <h1 className="text-5xl font-semibold text-primary">
              Installing Dependencies
            </h1>
            <p className="text-uGrayLight text-lg mt-4">
              This may take a few minutes depending on your system performance
              and internet speed.
            </p>
          </div>

          <div className="w-full">
            {/** LOADING BAR */}
            <div className=" flex flex-row items-center gap-2 mb-4 w-full">
              <p className="w-10 text-primary text-center font-mono">
                {percent}%
              </p>

              <div className="h-3 w-full bg-gray-300 rounded-md overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{
                    width: `${percent}%`,
                  }}
                ></div>
              </div>
            </div>

            {/** STEPS */}
            <ul className="text-sm space-y-2">
              {installationSteps.map((stepText, idx) => (
                <li
                  key={idx}
                  className={`flex gap-2 items-center ${
                    idx === currentStep
                      ? "text-primary"
                      : idx < currentStep
                      ? "text-green-500"
                      : "text-uGrayLight"
                  }`}
                >
                  <span className="w-10 h-3 rounded-full flex items-center justify-center text-xs">
                    {idx < currentStep ? (
                      <Check className="text-primary" />
                    ) : idx === currentStep ? (
                      <Loading size="small" />
                    ) : (
                      ""
                    )}
                  </span>
                  {stepText}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-5xl font-semibold text-primary">
            Install Dependencies
          </h1>
          <p className="text-uGrayLight text-lg mt-4">
            Running evaluation locally requires installation of local AI. This
            will require approximately 3.2GB of data. Make sure you have a
            stable internet connection to avoid disruption. Press Install to run
            installation.
          </p>
        </div>
      )}
    </StepContainer>
  );
};

export default LocalSetup;
