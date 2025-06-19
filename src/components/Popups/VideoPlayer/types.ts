export  interface VideoPlayerProps {
    videoUrl: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
}