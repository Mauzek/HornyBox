import { useCallback, useState } from "react";

interface PreloaderProps {
  isLoading: boolean;
}

interface PreloaderReturn {
  shouldShowPreloader: boolean;
  handlePreloaderComplete: () => void;
}

export const usePreloader = ({
  isLoading,
}: PreloaderProps): PreloaderReturn => {
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  
  const shouldShowPreloader = isLoading || showPreloader;
  
  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  return {
    shouldShowPreloader,
    handlePreloaderComplete,
  };
};
